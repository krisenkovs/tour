import { EntitySchema } from 'typeorm';

export const HotelEntity = new EntitySchema<any>({
  name: 'hotels',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    rate: {
      type: Number,
    },
    image: {
      type: String,
      nullable: true,
    },
  },
  relations: {
    country: {
      type: 'many-to-one',
      target: 'countries',
      joinColumn: {
        name: 'country_id',
      },
      eager: true,
    },
  },
});
