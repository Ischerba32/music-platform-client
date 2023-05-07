import { ITrack } from "./track";

export interface IRecommend {
  _id: string;
  name: string;
  picture: string;
  genre: string;
  tracks: ITrack[];
}