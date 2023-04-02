import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Resort } from './resort.entity';

@Entity('image_resort')
export class ImageResort {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;

  @ManyToOne(() => Resort)
  resort: Resort;
}
