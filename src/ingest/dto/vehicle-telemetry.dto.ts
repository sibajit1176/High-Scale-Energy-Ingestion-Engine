import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNumber,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';

export class VehicleTelemetryDto {
  @IsString()
  @IsNotEmpty()
  type: "vehicle";

  @IsInt()
  @Min(0)
  @Max(100)
  soc: number;

  @IsNumber()
  kwhDeliveredDc: number;

  @IsNumber()
  batteryTemp: number;

}
