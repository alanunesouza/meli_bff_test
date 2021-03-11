import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import {
  getProductDetailsInterceptor,
  getProductsInterceptor,
} from './app.interceptor';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  @UseInterceptors(getProductsInterceptor)
  getProducts(@Query('search') productName): any {
    return this.appService.getProducts(productName);
  }

  @Get('items/:id')
  @UseInterceptors(getProductDetailsInterceptor)
  getProductDetails(@Param() params): any {
    return this.appService.getProductDetails(params.id);
  }
}
