export interface IComment {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  listens: number;
  text: string;
  picture: string;
  audio: string;
  comments: IComment[];
}