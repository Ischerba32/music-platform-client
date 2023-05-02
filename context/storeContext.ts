import { createContext } from "react";
import { PlayerStore, TracksStore, UserStore, userStore, playerStore, tracksStore } from "../store/store";


interface Store {
  userStore: UserStore,
  playerStore: PlayerStore,
  tracksStore: TracksStore
}

export const StoreContext = createContext<Store>({
  userStore,
  playerStore,
  tracksStore
})
