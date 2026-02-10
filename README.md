# Telemetry API — README

## 1. Project Overview

This project is a **high-throughput telemetry ingestion service** built with **NestJS + PostgreSQL**.
It is designed to collect, validate, store, and correlate large volumes of meter telemetry data at scale.

The system is built to handle **14.4 million records per day** (~167 records/sec sustained load) with reliability, scalability, and observability in mind.

---

## 2. Tech Stack

* **Backend:** NestJS (Node.js, TypeScript)
* **Database:** PostgreSQL 15
* **Containerization:** Docker + Docker Compose
* **ORM:** TypeORM / Prisma (whichever your project uses)
* **Validation:** class-validator DTOs
* **Architecture:** Modular service-based NestJS architecture

---

## 3. Architecture Overview

### High-Level Flow

1. Client sends telemetry payload
2. Controller validates request
3. DTO enforces schema
4. Service processes data
5. Data is correlated with meter
6. Stored in PostgreSQL
7. Errors logged and handled gracefully

```
Client → Controller → DTO Validation → Service Layer → Database
```

---

## 4. Data Model Strategy

Telemetry data includes:

* meterId
* timestamp
* consumption values / readings
* system metadata

### Automatic Fields

The system automatically sets:

* `timestamp = new Date()`
* `meterId = "METER_DEFAULT"` (if not provided)

User is NOT required to pass these unless overriding.

---

## 5. Data Correlation Strategy

Handling high-volume telemetry requires proper correlation logic.

### Approach Used

#### 1. Meter-Based Partitioning

* Each telemetry record tied to a meterId
* Enables:

  * faster querying
  * logical grouping
  * horizontal scaling

#### 2. Timestamp-Based Ordering

* Ensures:

  * time-series consistency
  * historical tracking
  * event replay capability

#### 3. Idempotent Inserts

* Prevent duplicate telemetry entries
* Use:

  * unique constraints
  * hash keys
  * composite index (meterId + timestamp)

---

## 6. Handling 14.4 Million Records Per Day

### Performance Strategy

#### A. Batch Inserts

* Service groups records
* Reduces DB connection overhead

#### B. Indexing

Indexes created on:

* meterId
* timestamp
* composite (meterId + timestamp)

#### C. Connection Pooling

* PostgreSQL pool enabled
* Prevents DB overload

#### D. Async Processing

* Non-blocking writes
* Event-driven processing possible

#### E. Horizontal Scalability

* Multiple API replicas supported
* Load balancer compatible

---

## 7. Error Handling Logic

Service includes:

* Validation errors
* DB constraint handling
* Logging for failed ingestion
* Graceful fallback responses

Example:

* Missing meterId → default assigned
* Invalid payload → 400 response
* DB failure → retry / log

---

## 8. Project Structure

```
src/
 ├── ingest/
 │    ├── ingest.controller.ts
 │    ├── ingest.service.ts
 │    ├── ingest.module.ts
 │    └── dto/
 │         ├── meter-telemetry.dto.ts
 │         
 │
 ├── telemetry/
 │    ├── entities/
 │    │     ├── meter-history.entity.ts
 │    │     ├── meter-live.entity.ts
 │    │     ├── vehicle-history.entity.ts
 │    │     └── vehicle-live.entity.ts
 │    └── telemetry.module.ts
 │
 └── app.module.ts

```

---

## 9. Running the Project

### Prerequisites

* Docker installed
* Node.js 18+

---

## 10. Docker Setup

### docker-compose.yml

```
services:
  api:
    build: .
    container_name: telemetry-api
    env_file:
      - .env
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "3000:3000"

  postgres:
    image: postgres:15
    container_name: telemetry-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: telemetry_db
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
```

---

### Dockerfile

```
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

---

## 11. Running the Application

### Step 1 — Build containers

```
docker-compose build
```

### Step 2 — Start services

```
docker-compose up
```

API runs at:

```
http://localhost:3000
```

PostgreSQL runs at:

```
localhost:5432
```

---

## 12. Environment Variables

Example `.env`

```
PORT=3000

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=telemetry_db
```

---

## 13. API Payload Example

```
{
  "meterId": "METER_001",
  "reading": 123.45
}
```

If meterId not provided:

```
meterId = "METER_DEFAULT"
timestamp = auto-generated
```

---

## 14. Scaling Considerations (Production)

* Kubernetes deployment recommended
* Read replicas for PostgreSQL
* Kafka / RabbitMQ for ingestion buffering
* Redis caching layer
* Time-series DB migration optional (TimescaleDB)

---

## 15. Observability

Recommended integrations:

* Prometheus
* Grafana
* ELK stack

Metrics tracked:

* ingestion rate
* failed records
* DB latency
* API response time

---

## 16. Future Improvements

* Streaming ingestion pipeline
* Meter anomaly detection
* Real-time dashboard
* Event sourcing
* Data lake export

---

## 17. GitHub Repository


```
https://github.com/sibajit1176/High-Scale-Energy-Ingestion-Engine.git
```

---

## 18. Author Notes

This system is designed for **high-volume telemetry ingestion**, prioritizing:

* reliability
* scalability
* structured data correlation
* production readiness
* container-first deployment

---
