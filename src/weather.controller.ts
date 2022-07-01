import { Controller, Get, Param } from "@nestjs/common";
import { WeatherService } from "./weather.service";

// Dependencias utilizadas para essa API
// npm install @nestjs/axios
// npm install @nestjs/config

@Controller()
export class WeatherController{
    constructor(private readonly weatherService: WeatherService) {}


    @Get(':cidade')
    obterClima(@Param() params){
        return this.weatherService.getWeather(params);
    }
}