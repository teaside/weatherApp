export class City {
    public id: number;
    public name: string;
    public temperature: number;
}
export function fromOpenWeatherToClientApi(city): City {
    const validCity: City = new City();
    validCity.id = city['id'];
    validCity.name = city['name'];
    validCity.temperature = city['main']['temp'];
    return validCity;
}
