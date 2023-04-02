import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @Column({ nullable: true })
  price: number;
}
