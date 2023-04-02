import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Tour } from './tour.entity';
import { Order } from './order.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from './auth.constants';
import { UserService } from './user.service';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { Country } from './country.entity';
import { Resort } from './resort.entity';
import { Hotel } from './hotel.entity';
import { ImageResort } from './imageResort.entity';
import { ImageHotel } from './imageHotel.entity';
import { Comment } from './comment.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'build'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cgk89om4dad69r1a4pgg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'tour_9t08_user',
      password: 'q57IRp1tW7eUaKCJGcdim3opGdWQWVs0',
      database: 'tour_9t08',
      entities: [
        User,
        Tour,
        Order,
        Country,
        Resort,
        Hotel,
        ImageResort,
        ImageHotel,
        Comment,
      ],
      synchronize: true,
      ssl: true,
      logging: 'all',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Tour,
      Order,
      Country,
      Resort,
      Hotel,
      ImageResort,
      ImageHotel,
      Comment,
    ]),
    PassportModule,
    JwtModule.register({
      secret: SECRET,
    }),
  ],
  providers: [
    UserService,
    TourService,
    OrderService,
    AuthService,
    JwtStrategy,
    CountryService,
  ],
  controllers: [
    TourController,
    OrderController,
    AuthController,
    CountryController,
  ],
})
export class AppModule {}
