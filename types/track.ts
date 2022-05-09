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

export interface ITrackState {
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface IFetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface IFetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = IFetchTracksAction | IFetchTracksErrorAction;