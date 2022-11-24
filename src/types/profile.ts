import { Decoder, number, object, string } from "decoders";

export interface Profile {
  userId: number;
  email: string;
  name: string;
  avatar: string;
  sex: string | undefined;
  dateOfBirth: string | undefined;
  country: string | undefined;
}

export const profileDecoder: Decoder<Profile> = object({
  userId: number,
  email: string,
  name: string,
  avatar: string,
  sex: string,
  dateOfBirth: string,
  country: string,
});
