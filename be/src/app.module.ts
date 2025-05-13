import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndieCampersController } from './indie-campers.controller';
import { IndieCampersService } from './indie-campers.service';

@Module({
  imports: [],
  controllers: [AppController, IndieCampersController],
  providers: [AppService, IndieCampersService],
})
export class AppModule {}
