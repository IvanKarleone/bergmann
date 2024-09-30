export class RandomHelper {
  static generateRandomNumbers(
    min: number,
    max: number,
    amount: number
  ): number[] {
    const randomNumbers: number[] = [];

    for (let i = 0; i < amount; i++) {
      const randomNumber = RandomHelper.generateRandomNumber(min, max);

      randomNumbers.push(randomNumber);
    }

    return randomNumbers;
  }

  static generateCity(): string {
    const cities: string[] = [
      'Prague',
      'Reykjavik',
      'Riga',
      'Rio de Janeiro',
      'Saint Petersburg',
      'Sofia',
      'Montreal',
      'Nairobi',
      'New York',
      'Oxford',
    ];
    const index = RandomHelper.generateRandomNumber(0, cities.length);

    return cities[index];
  }

  static generateIndicator(): string {
    const indicators: string[] = [
      'Temperature',
      'Emissions',
      'Wind',
      'Humidity',
      'Visibility',
      'Pressure',
    ];
    const index = RandomHelper.generateRandomNumber(0, indicators.length);

    return indicators[index];
  }

  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
