import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DuffelController } from './duffel.controller';
import { DuffelService } from './duffel.service';

@Module({
  imports: [],
  controllers: [AppController, DuffelController],
  providers: [AppService, DuffelService],
})
export class AppModule {}
