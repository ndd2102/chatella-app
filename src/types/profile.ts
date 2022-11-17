import { Decoder, nullable, object, string } from "decoders";
export interface Profile {
  userId: string;
  email: string;
  name: string;
  avatar: string;
  sex: string | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  country: string | null;
  createdDate: string;
}

export const userDecoder: Decoder<Profile> = object({
  userId: string,
  email: string,
  name: string,
  avatar: string,
  sex: nullable(string),
  dateOfBirth: nullable(string),
  phoneNumber: nullable(string),
  country: nullable(string),
  createdDate: string,
});
