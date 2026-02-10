import { Injectable, InternalServerErrorException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterTelemetryDto } from './dto/meter-telemetry.dto';
import { MeterTelemetryHistoryEntity } from '../telemetry/entities/meter-history.entity';
import { MeterLiveStatusEntity } from '../telemetry/entities/meter-live.entity';
import { VehicleTelemetryHistoryEntity } from '../telemetry/entities/vehicle-history.entity';
import { VehicleLiveStatusEntity } from '../telemetry/entities/vehicle-live.entity';

@Injectable()
export class IngestService {
  constructor(
    @InjectRepository(MeterTelemetryHistoryEntity)
    private meterHistoryRepo: Repository<MeterTelemetryHistoryEntity>,

    @InjectRepository(MeterLiveStatusEntity)
    private meterLiveRepo: Repository<MeterLiveStatusEntity>,

    @InjectRepository(VehicleTelemetryHistoryEntity)
    private vehicleHistoryRepo: Repository<VehicleTelemetryHistoryEntity>,

    @InjectRepository(VehicleLiveStatusEntity)
    private vehicleLiveRepo: Repository<VehicleLiveStatusEntity>,
  ) {}

 async ingestMeterTelemetry(payload: MeterTelemetryDto) {
  try {
    const now = new Date();

    if (!payload.meterId) {
      throw new BadRequestException('meterId missing in payload');
    }

    // HISTORY → INSERT ONLY
    await this.meterHistoryRepo.insert({
      meterId: payload.meterId,
      kwhConsumedAc: payload.kwhConsumedAc,
      voltage: payload.voltage,
      timestamp:  now,
    });

    // LIVE → UPSERT
    await this.meterLiveRepo
      .createQueryBuilder()
      .insert()
      .values({
        meterId: payload.meterId,
        lastKwhConsumedAc: payload.kwhConsumedAc,
        voltage: payload.voltage,
        lastUpdated: now,
      })
      .orUpdate(
        ['lastKwhConsumedAc', 'voltage', 'lastUpdated'],
        ['meterId'],
      )
      .execute();

    return { status: 'Meter telemetry ingested successfully' };

  } catch (error) {
    console.error('Meter ingest error:', error.message, error.stack);
    throw new InternalServerErrorException('Failed to ingest meter telemetry');
  }
}


async ingestVehicleTelemetry(payload: MeterTelemetryDto) {
    try {
      const now = new Date();

      await this.vehicleHistoryRepo.insert({
        vehicleId: payload.vehicleId,
        soc: payload.soc,
        kwhDeliveredDc: payload.kwhDeliveredDc,
        batteryTemp: payload.batteryTemp,
        timestamp: now,
      });

      await this.vehicleLiveRepo
        .createQueryBuilder()
        .insert()
        .into(VehicleLiveStatusEntity)
        .values({
          vehicleId: payload.vehicleId,
          soc: payload.soc,
          lastKwhDeliveredDc: payload.kwhDeliveredDc,
          batteryTemp: payload.batteryTemp,
          lastUpdated: now,
        })
        .orUpdate(
          ['soc', 'lastKwhDeliveredDc', 'batteryTemp', 'lastUpdated'],
          ['vehicleId'],
        )
        .execute();

      return { status: 'Vehicle telemetry ingested successfully' };

    } catch (error) {
      console.error('Vehicle ingest error:', error);
      throw new InternalServerErrorException(
        'Failed to ingest vehicle telemetry',
      );
    }
  }

}
