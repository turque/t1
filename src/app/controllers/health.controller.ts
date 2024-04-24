import { Controller, Get } from '@/utils/inject.utils';
import { Response, Request } from 'express';

@Controller('/')
export class HealthController {
  @Get('/')
  public async ping(_: Request, response: Response) {
    return response.json({ message: 'on line' });
  }
}
