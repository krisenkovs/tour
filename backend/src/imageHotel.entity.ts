import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hotel } from 'src/hotel.entity';

@Entity('image_hotel')
export class ImageHotel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;

  @ManyToOne(() => Hotel)
  hotel: Hotel;
}
