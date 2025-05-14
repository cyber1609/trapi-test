import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { DuffelService } from './duffel.service';
import { Response } from 'express';

@Controller()
export class DuffelController {
  constructor(private readonly duffelService: DuffelService) {}

  @Post('/duffel-flights-list-offers')
  async listOffers(@Body() body: any, @Res() res: Response) {
    console.log('Request Body:', JSON.stringify(body));
    try {
      const response = await this.duffelService.listOffers(body);
      console.log('Response Body:', JSON.stringify(response));
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Duffel Error:', error?.response?.data || error.message || error);
      return res.status(HttpStatus.BAD_GATEWAY).json({ error: error?.response?.data || error.message || 'Duffel API error' });
    }
  }
}
