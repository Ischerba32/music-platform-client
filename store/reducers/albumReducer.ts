import { AlbumAction, AlbumActionTypes, AlbumState } from "../../types/album";

const initialState: AlbumState = {
  albums: [],
  error: ''
}

export const albumReducer = (state = initialState, {type, payload}: AlbumAction): AlbumState => {
  switch (type) {
    case AlbumActionTypes.FETCH_ALBUMS:
      return {...state, albums: payload}
    case AlbumActionTypes.FETCH_ALBUMS_ERROR:
      return {...state, error: payload}
    default:
      return state;
  }
}