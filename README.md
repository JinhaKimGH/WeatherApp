# 🌦 Weather App

An app that lets users view the weather in any city around the world! Utilizes Angular, HTML, CSS, and the OpenWeatherMap API.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

# 🪄 Features

Users:
- Can search for different cities in the search bar
- View weather details, hourly forecasts, and daily forecasts
- Swap light and dark mode
- Swap systems of measurement

# 📸 Screenshots

![image](https://github.com/JinhaKimGH/WeatherApp/assets/56976518/2b28d8f5-f73e-407d-b058-3483997ad0f1)

![image](https://github.com/JinhaKimGH/WeatherApp/assets/56976518/13a37b30-fb73-422e-8ed6-f382df6a12dd)

# 🚀 Running Locally

## Obtain an API key 

Obtain an api key from the [OpenWeatherMap API](https://openweathermap.org/price). 

Under the src folder in the project run `mkdir environments` to create a new folder for environment variables.

Under this new folder create a *environment.ts* file containing this code:

```
export const environment = {
    production: false,
    apiKey: ''
  };
```

Where apiKey contains the string value of your free api key.


## Install Dependencies

Run `npm i` to install all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jinha-kim/)
