import { IsNumber, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { TelemetryType } from 'src/telemetry/telemetry-type.enum';

export class MeterTelemetryDto {

  @IsEnum(TelemetryType)
  type: TelemetryType.METER;

  @IsNumber()
  kwhConsumedAc: number;

  @IsNumber()
  voltage: number;

  @IsInt()
  @Min(0)
  @Max(100)
  soc: number;
  
  @IsNumber()
  kwhDeliveredDc: number;
  
  @IsNumber()
  batteryTemp: number;

 @IsString()
  meterId: string;
  
   @IsString()
  vehicleId: string;
}
