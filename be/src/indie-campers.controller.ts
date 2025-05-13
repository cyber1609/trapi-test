import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { IndieCampersService } from './indie-campers.service';
import { Response } from 'express';

@Controller('indie-campers-list-locations')
export class IndieCampersController {
  constructor(private readonly indieCampersService: IndieCampersService) {}

  @Get()
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
}
