import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class IndieCampersBookingService {
  async createBooking(body: any, headers: any): Promise<any> {
    const url = 'https://stag-indie-platform.goindie.online/api/partners/v2/bookings';
    const apiHeaders = {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.INDIE_CAMPERS_API_KEY}`,
      ...headers,
    };
    let attempt = 0;
    const maxRetries = 3;
    const timeout = 60000;
    while (attempt < maxRetries) {
      try {
        console.log('Request:', { url, apiHeaders, body });
        const response: AxiosResponse = await axios.post(url, body, { headers: apiHeaders, timeout });
        console.log('Response:', response.data);
        return response.data;
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
      }
    }
  }
}
