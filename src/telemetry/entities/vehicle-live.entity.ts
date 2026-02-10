import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('vehicle_live_status')
export class VehicleLiveStatusEntity {
  @PrimaryColumn()
  vehicleId: string;

  @Column('int')
  soc: number;

  @Column('decimal')
  lastKwhDeliveredDc: number;

  @Column('decimal')
  batteryTemp: number;

  @Column({ type: 'timestamp' ,nullable:true})
  lastUpdated: Date;
}
