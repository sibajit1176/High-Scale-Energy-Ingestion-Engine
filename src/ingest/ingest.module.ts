import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterTelemetryHistoryEntity } from 'src/telemetry/entities/meter-history.entity';
import { MeterLiveStatusEntity } from 'src/telemetry/entities/meter-live.entity';
import { VehicleTelemetryHistoryEntity } from 'src/telemetry/entities/vehicle-history.entity';
import { VehicleLiveStatusEntity } from 'src/telemetry/entities/vehicle-live.entity';


@Module({
  imports:[ TypeOrmModule.forFeature([
      MeterTelemetryHistoryEntity,
      MeterLiveStatusEntity,
      VehicleTelemetryHistoryEntity,
      VehicleLiveStatusEntity,
    ]),],
  controllers: [IngestController],
  providers: [IngestService]
})
export class IngestModule {}
