import { EntitySchema } from 'typeorm';

export const TourEntity = new EntitySchema<any>({
  name: 'tours',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date: {
      type: Date,
      nullable: true,
    },
    mens: {
      type: Number,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      nullable: true,
    },
  },
  relations: {
    hotel: {
      type: 'many-to-one',
      target: 'hotels',
      joinColumn: {
        name: 'hotel_id',
      },
      eager: true,
    },
  },
});
