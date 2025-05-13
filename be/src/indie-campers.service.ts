import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class IndieCampersService {
  async listLocations(): Promise<any> {
    const url = 'https://stag-indie-platform.goindie.online/api/partners/v2/locations';
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.INDIE_CAMPERS_API_KEY}`,
    };
    let attempt = 0;
    const maxRetries = 3;
    const timeout = 60000;
    while (attempt < maxRetries) {
      try {
        console.log('Request:', { url, headers });
        const response: AxiosResponse = await axios.get(url, { headers, timeout });
        return response.data;
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
      }
    }
  }

  async listAvailabilities(from_location: string, to_location: string, checkin_date: string, checkout_date: string): Promise<any> {
    const url = `https://stag-indie-platform.goindie.online/api/partners/v2/availability/${from_location}/${to_location}?checkin_date=${checkin_date}&checkout_date=${checkout_date}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.INDIE_CAMPERS_API_KEY}`,
    };
    let attempt = 0;
    const maxRetries = 3;
    const timeout = 60000;
    while (attempt < maxRetries) {
      try {
        console.log('Request:', { url, headers });
        const response: AxiosResponse = await axios.get(url, { headers, timeout });
        return response.data;
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
      }
    }
  }
}
