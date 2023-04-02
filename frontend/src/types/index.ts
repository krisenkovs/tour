export type User = {
  id: string;
  email: string;

  firstName: string;

  lastName: string;

  password: string;
};

export type Country = {
  id: number;

  name: string;

  description: string;

  isActive: boolean;

  image: string;
};
