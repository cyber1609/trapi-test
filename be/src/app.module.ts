import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndieCampersService } from './indie-campers.service';
import { IndieCampersController } from './indie-campers.controller';
import { IndieCampersBookingService } from './indie-campers-booking.service';
import { IndieCampersBookingController } from './indie-campers-booking.controller';

@Module({
  imports: [],
  controllers: [AppController, IndieCampersController, IndieCampersBookingController],
  providers: [AppService, IndieCampersService, IndieCampersBookingService],
})
export class AppModule {}
