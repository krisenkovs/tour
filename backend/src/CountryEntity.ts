import { EntitySchema } from 'typeorm';

export const CountryEntity = new EntitySchema<{ id: number; name: string; active: boolean }>({
  name: 'countries',
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
  },
});
