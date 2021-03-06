import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://api.mercadolibre.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
