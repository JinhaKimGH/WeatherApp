interface Coordinates{
    lon: Number;
    lat: Number;
}

interface WeatherCondition{
    id: Number;
    main: String;
    description: string;
    icon: String;
}

interface Main{
    temp: Number; // Kelvin
    feels_like: Number; // Kelvin
    pressure: Number; // hPa
    humidity: Number; // %
    temp_min: Number; // Min Temp Kelvin
    temp_max: Number; // Max Temp Kelvin
    sea_level: Number; //hPa
    grnd_level: Number; //hPa
}

interface Wind{
    speed: Number; // m/s
    deg: Number; // Degrees
    gust: Number; // m/s
}

interface Clouds{
    all: Number; // %
}

interface Precipitation{
    "1h": Number; // mm
    "3h": Number; // mm
}

interface Sys{
    type: Number;
    id: Number;
    message: String;
    country: String;
    sunrise: Number;
    sunset: Number;
}

export interface Weather {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: String;
    main: Main;
    visibility: Number; // metres
    wind: Wind;
    clouds: Clouds;
    rain: Precipitation;
    snow: Precipitation;
    dt: Number;
    sys: Sys;
    timezone: Number;
    id: Number;
    name: String;
    cod: Number;
    dt_txt: Date;
}

interface City{
    id: String;
    name: String;
    country: String;
    population: Number;
    timezone: Number;
    sunrise: number;
    sunset: number;
}

export interface WeatherList{
    list: Weather[];
    city: City;
}
