import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  getProductDetailsInterceptor,
  getProductsInterceptor,
} from './app.interceptor';
import { AppService } from './app.service';
import { ParamsDTO } from './dto/params.dto';
import { QueryParamsDTO } from './dto/queryparams.dto';
import { ProductList } from './types';
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  @UseInterceptors(getProductsInterceptor)
  @UsePipes(new ValidationPipe())
  getProducts(
    @Query() reqQuery: QueryParamsDTO,
  ): Promise<Observable<ProductList>> {
    return this.appService.getProducts(reqQuery.search);
  }

  @Get('items/:id')
  @UseInterceptors(getProductDetailsInterceptor)
  @UsePipes(new ValidationPipe())
  getProductDetails(@Param() reqParams: ParamsDTO): any {
    return this.appService.getProductDetails(reqParams.id);
  }
}
