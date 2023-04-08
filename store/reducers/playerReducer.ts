import {PlayerAction, PlayerActionTypes, PlayerState} from "../../types/player";

const initialState: PlayerState = {
    currentTime: 0,
    active: null,
    volume: 50,
    pause: true,
    collapsed: true,
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PAUSE:
            return {...state, pause:true}
        case PlayerActionTypes.PLAY:
            return {...state, pause:false}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state, active: action.payload, currentTime: 0}
        case PlayerActionTypes.SET_COLLAPSED:
            return {...state, collapsed: action.payload}
        default:
            return state

    }
}
