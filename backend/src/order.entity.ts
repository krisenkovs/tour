import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Tour } from './tour.entity';
import { Hotel } from './hotel.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @ManyToOne(() => User)
  user: User;

  @Column()
  persons: number;

  @Column()
  price: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
