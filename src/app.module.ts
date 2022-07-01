import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}
