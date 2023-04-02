import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Resort } from 'src/resort.entity';

@Entity('hotel')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Resort)
  resort: Resort;

  @Column()
  starts: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  isActive: boolean;
}
