export class City {
    public id: number;
    public name: string;
    public main: Main;
    public weather: Weather[];
}

class Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

class Weather {
    id: number;
    main: string;
    description: string;
}
