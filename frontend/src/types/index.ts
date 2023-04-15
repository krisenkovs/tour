export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type CountryType = {
  id: number;
  name: string;
  active: boolean;
};

export type HotelType = {
  id: number;
  name: string;
  active: boolean;
  rate: number;
  image: string;
  country: CountryType;
};

export type TourType = {
  id: number;
  date: string;
  mens: number;
  active: boolean;
  hot: boolean;
  price: number;
  hotel: HotelType;
};
