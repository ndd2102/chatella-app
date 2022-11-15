import { Decoder, nullable, object, string } from "decoders";

export interface Profile {
  name: string;
  bio: string | null;
  image: string | null;
  sex: string | null;
  email: string | null;
  dateOfBirth: string | null;
  address: string | null;
  phoneNumber: string | null;
  idCard: string | null;
  nation: string | null;
  createdDate: string;
}

export const userDecoder: Decoder<Profile> = object({
  email: string,
  token: string,
  name: string,
  bio: nullable(string),
  image: nullable(string),
  sex: nullable(string),
  dateOfBirth: nullable(string),
  address: nullable(string),
  phoneNumber: nullable(string),
  idCard: nullable(string),
  nation: nullable(string),
  createdDate: string,
});
