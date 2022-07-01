import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { response } from "express";
import { map } from "rxjs";

@Injectable()
export class WeatherService {
    private readonly API_KEY = process.env.API_KEY;
    private data = {};
    constructor(private readonly httpService: HttpService) {}
    getWeather(params){
        return this.httpService
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${params.cidade}&appid=${this.API_KEY}&lang=pt_br&units=metric`)
        .pipe(
            map((response) => response.data),
            map((data) => ({
                ...this.data[params.cidade],
                cidade: data.name,
                pais: data.sys.country,
                velocidadeDoVentoEmMetrosSec: data.wind.speed,
                descricaoDoTempo: data.weather[0].description,
                nuvensEmPorcentagem: data.clouds.all,
                humidadeEmPorcentagem: data.main.humidity,
                temperaturaEmCelsius: data.main.temp,
                sensacaoDeTemperatura: data.main.feels_like,
                temperaturaMinima: data.main.temp_min,
                temperaturaMaxima: data.main.temp_max,
                localTime: `${new Date(
                    data.dt * 1000 - data.timezone / 1000
                  )}`
            })),
        );
    }
}