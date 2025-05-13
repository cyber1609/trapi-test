import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { IndieCampersService } from './indie-campers.service';
import { Response } from 'express';

@Controller()
export class IndieCampersController {
  constructor(private readonly indieCampersService: IndieCampersService) {}

  @Get('indie-campers-list-locations')
  async listLocations(@Res() res: Response) {
    try {
      const data = await this.indieCampersService.listLocations();
      console.log('Response:', data);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(HttpStatus.BAD_GATEWAY).json({ error: 'Failed to fetch Indie Campers locations' });
    }
  }

  @Get('indie-campers-list-availabilities')
  async listAvailabilities(
    @Query('from_location') from_location: string,
    @Query('to_location') to_location: string,
    @Query('checkin_date') checkin_date: string,
    @Query('checkout_date') checkout_date: string,
    @Res() res: Response
  ) {
    const reqBody = { from_location, to_location, checkin_date, checkout_date };
    console.log('Request:', reqBody);
    try {
      const data = await this.indieCampersService.listAvailabilities(from_location, to_location, checkin_date, checkout_date);
      console.log('Response:', data);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(HttpStatus.BAD_GATEWAY).json({ error: 'Failed to fetch Indie Campers availabilities' });
    }
  }
}
