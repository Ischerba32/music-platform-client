import { makeAutoObservable } from "mobx";
import { ITrack } from "../types/track";
import axios from "axios";
import $api from "../config/axios";

export class UserStore {
  private userId: string;
  private isLoggedIn: boolean = false;
  private role = null;

  constructor() {
    makeAutoObservable(this)
  }

  public get id(): string {
    return this.userId;
  }

  public get isLogged(): boolean {
    return this.isLoggedIn;
  }

  public get userRole(): string | null {
    return this.role;
  }

  public set id(id: string) {
    this.userId = id;
  }

  public set isLogged(flag: boolean) {
    this.isLoggedIn = flag;
  }

  public set userRole(role: string) {
    this.role = role;
  }

  async signIn(data){
    try {
      const response = await $api.post('/auth/signIn', {
        ...data
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      this.userId = response.data._doc._id;
      this.userRole = response.data._doc.role;
      this.isLogged = !!response.data.token;
    } catch(error) {
      console.log(error);

    }
  }
  async signUp(){}

  async logout(){
    localStorage.removeItem('token');
    this.isLogged = false;
  }

  async checkAuth(){
    try {
      const isAuthorized = await $api.get('/auth/check-auth');
      console.log(isAuthorized.data);

      if (!isAuthorized) {
        this.isLogged = false;
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class TracksStore {
  musicTracks: ITrack[] = [];
  errorMessage: string;

  constructor() {
    makeAutoObservable(this);
  }

  public get tracks() {
    return this.musicTracks;
  }

  public get error() {
    return this.errorMessage
  }

  public set tracks(tracks: ITrack[]) {
    this.musicTracks = tracks;
  }

  public set error(error: string) {
    this.errorMessage = error;
  }

  async fetchTracks() {
    try {
      const response = await $api.get('http://localhost:5000/tracks')
      console.log('response: ', response.data);

      this.musicTracks = await response.data;
      return response.data;
    }
    catch(error) {
      this.error = error;
    }
  }
}

export class PlayerStore {
  private currentPlayerTime = 0;
  private activeTrack: ITrack | null = null;
  private volumePlayer = 50;
  private paused = true;
  private isCollapsed = true;

  constructor() {
    makeAutoObservable(this);
  }

  public get currentTime() {
    return this.currentPlayerTime;
  }

  public get active() {
    return this.activeTrack;
  }

  public get volume() {
    return this.volumePlayer;
  }

  public get pause() {
    return this.paused;
  }

  public get collapsed() {
    return this.isCollapsed;
  }

  public set currentTime(time: number) {
    this.currentPlayerTime = time;
  }

  public set active(activeTrack: ITrack) {
    this.activeTrack = activeTrack;
  }

  public set volume(value: number) {
    this.volumePlayer = value;
  }

  public set pause(flag: boolean) {
    this.paused = flag
  }

  public set collapsed(flag: boolean) {
    this.isCollapsed = flag;
  }


  play() {
    this.pause = false
  }
}

export const userStore = new UserStore();
export const playerStore = new PlayerStore();
export const tracksStore = new TracksStore();