import axios from "axios";
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks');
      dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data});
    } catch (error) {
      dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Tracks fetch error'});
    }
  }
}