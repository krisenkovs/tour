import { TokenEntity } from './TokenEntity';
import { UserEntity } from './UserEntity';
import { HotelEntity } from './HotelEntity';
import { CountryEntity } from './CountryEntity';
import { DataSource } from 'typeorm';
import { TourEntity } from './TourEntity';
import { OrderEntity } from './OrderEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  //host: 'dpg-cgk89om4dad69r1a4pgg-a.oregon-postgres.render.com',
  //port: 5432,
  //username: 'tour_9t08_user',
  //password: 'q57IRp1tW7eUaKCJGcdim3opGdWQWVs0',
  //database: 'tour_9t08',

  synchronize: true,
  //ssl: true,
  logging: 'all',
  database: 'db.db', 
  //extra: {
    //ssl: {
      //rejectUnauthorized: false,
    //},
  //},
  entities: [CountryEntity, HotelEntity, UserEntity, TokenEntity, TourEntity, OrderEntity],
});
