import { Controller, Get } from '@nestjs/common';
import { CountryService } from 'src/country.service';

@Controller()
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('api/countries/active')
  getAllCountries() {
    return this.countryService.getActive();
  }
}
