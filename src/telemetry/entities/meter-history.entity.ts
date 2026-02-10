import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('meter_telemetry_history')
@Index(['meterId', 'timestamp'])
export class MeterTelemetryHistoryEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  meterId: string;

  @Column({ type:'decimal', nullable:true })
  kwhConsumedAc: number;

  @Column({ type:'decimal', nullable:true })
  voltage: number;

  @Column({nullable:true })
  timestamp: Date;
}
