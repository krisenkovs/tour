import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from 'src/country.entity';

@Entity('resort')
export class Resort {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  isActive: boolean;
}
