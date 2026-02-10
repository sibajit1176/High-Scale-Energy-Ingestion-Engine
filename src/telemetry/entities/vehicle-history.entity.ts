import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('vehicle_telemetry_history')
@Index(['vehicleId', 'timestamp'])
export class VehicleTelemetryHistoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  vehicleId: string;

  @Column({type:'int',nullable:true})
  soc: number;

  @Column({type:'decimal',nullable:true})
  kwhDeliveredDc: number;

  @Column({type:'decimal',nullable:true})
  batteryTemp: number;

  @Column({ type: 'timestamp' ,nullable:true})
  timestamp: Date;
}
