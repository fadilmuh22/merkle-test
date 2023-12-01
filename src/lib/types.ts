export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export type LoginPayload = {
  username: string;
  password: string;
};

export type UserFormPayload = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export type LoginToken = {
  token: string;
};
