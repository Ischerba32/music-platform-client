import { ITrack } from "./track";

export interface IPlaylist {
  _id: string;
  name: string;
  owner: string;
  picture: string
  tracks: ITrack[];
}