import { Controller, Post, Body, Headers, Res, HttpStatus } from '@nestjs/common';
import { IndieCampersBookingService } from './indie-campers-booking.service';
import { Response } from 'express';

@Controller('indie-campers-booking')
export class IndieCampersBookingController {
  constructor(private readonly indieCampersBookingService: IndieCampersBookingService) {}

  @Post()
  async createBooking(
    @Body() body: any,
    @Headers() headers: any,
    @Res() res: Response,
  ) {
    try {
      const data = await this.indieCampersBookingService.createBooking(body, headers);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(HttpStatus.BAD_GATEWAY).json({ error: 'Failed to create Indie Campers booking' });
    }
  }
}
