import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class DuffelService {
  async listOffers(body: any): Promise<any> {
    const url = 'https://api.duffel.com/air/offer_requests';
    const headers = {
      'Accept-Encoding': 'gzip',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Duffel-Version': 'v2',
      'Authorization': `Bearer ${process.env.DUFFEL_API_KEY}`,
    };
    let lastError: any;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await axios.post(url, body, { headers, timeout: 60000 });
        return response.data;
      } catch (error) {
        lastError = error;
        if (attempt === 2 || (error as AxiosError).response?.status < 500) throw error;
      }
    }
    throw lastError;
  }
}
