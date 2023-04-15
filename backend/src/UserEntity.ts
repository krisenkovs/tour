import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema<{ id: number; login: string; password: string }>({
  name: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    login: {
      type: String,
      nullable: true,
    },
    password: {
      type: String,
      nullable: true,
    },
  },
});
