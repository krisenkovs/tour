import { EntitySchema } from 'typeorm';

export const TokenEntity = new EntitySchema<{
  id?: number;
  token?: string;
  expire?: string;
  user: { id?: number; login?: string; password?: string };
}>({
  name: 'tokens',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    token: {
      type: String,
      nullable: true,
    },
    expire: {
      type: Date,
      nullable: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'user_id',
      },
      eager: true,
    },
  },
});
