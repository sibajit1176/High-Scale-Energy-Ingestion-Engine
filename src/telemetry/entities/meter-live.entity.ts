import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meter_live_status')
export class MeterLiveStatusEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  meterId: string;

  @Column({ type:'decimal', nullable:true })
  lastKwhConsumedAc: number;

  @Column({ type:'decimal', nullable:true })
  voltage: number;

  @Column({nullable:true})
  lastUpdated: Date;


}
