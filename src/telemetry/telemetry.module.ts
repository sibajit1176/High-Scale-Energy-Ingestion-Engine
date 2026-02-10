import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterTelemetryHistoryEntity } from './entities/meter-history.entity';
import { MeterLiveStatusEntity } from './entities/meter-live.entity';
import { VehicleTelemetryHistoryEntity } from './entities/vehicle-history.entity';
import { VehicleLiveStatusEntity } from './entities/vehicle-live.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeterTelemetryHistoryEntity,
      MeterLiveStatusEntity,
      VehicleTelemetryHistoryEntity,
      VehicleLiveStatusEntity,
    ]),
  ],
  exports: [
    TypeOrmModule, 
  ],
})
export class TelemetryModule {}
