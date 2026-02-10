import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { IngestService } from './ingest.service';
import { MeterTelemetryDto } from './dto/meter-telemetry.dto';
import { TelemetryType } from 'src/telemetry/telemetry-type.enum';

@Controller('v1/ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
 @Post()
async ingestTelemetry(@Body() payload: MeterTelemetryDto) {
  if (payload.type === TelemetryType.METER) {
    return this.ingestService.ingestMeterTelemetry(payload);
  }

  if (payload.type === TelemetryType.VEHICLE) {
    return this.ingestService.ingestVehicleTelemetry(payload);
  }

  throw new BadRequestException('Invalid telemetry payload');
}

}
