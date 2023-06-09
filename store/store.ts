import { makeAutoObservable } from "mobx";
import { ITrack } from "../types/track";
import axios from "axios";
import $api from "../config/axios";
import { IAlbum } from "../types/album";
import { IPlaylist } from "../types/playlist";
import { IRecommend } from "../types/recommend";

export class UserStore {
  private userId: string;
  private userName: string;
  private isLoggedIn: boolean = false;
  private role = null;
  private favoriteTracks: ITrack[] = []

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

  public get username(): string {
    return this.userName;
  }
  public get favorites(): ITrack[] {
    return this.favoriteTracks;
  }

  public set username(username: string) {
    this.userName = username;
  }

  public set favorites(favorites: ITrack[]) {
    this.favoriteTracks = favorites;
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

  isTrackInFav(trackId: string) {
    return this.favoriteTracks.some(track => track._id === trackId)
  }

  async removeTrackFromFav(trackId: string) {
    try {
      const response = await $api.post('/tracks/remove-from-favs', {
        userId: this.userId,
        trackId,
      })
      this.favoriteTracks = this.favoriteTracks.filter(track => track._id !== trackId);
      // this.currentPlaylist.tracks = this.currentPlaylist.tracks.filter(track => track._id !== trackId);
      // this.currentPlaylist = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async addTrackToFav(trackId: string) {
    try {
      const response = await $api.post('/tracks/add-to-favs', {
        userId: this.userId,
        trackId,
      })
      console.log(response.data);

      this.favoriteTracks.push(response.data);
      // this.currentPlaylist.tracks = this.currentPlaylist.tracks.filter(track => track._id !== trackId);
      // this.currentPlaylist = response.data;
    } catch (error) {
      console.log(error);
    }
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
      this.username = response.data._doc.username;
      this.favoriteTracks = response.data._doc.favorites;
      return response.data._doc.role;
    } catch(error) {
      throw new Error(error.response.data.message);
    }
  }
  async signUp(data){
    try {
      const response = await $api.post('/auth/signUp', {
        ...data
      })
      console.log(response);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async logout(){
    localStorage.removeItem('token');
    this.isLogged = false;
    this.userName = '';
    this.userRole = null;
    this.userId = '';
  }

  async checkAuth(){
    try {
      const response = await $api.get('/auth/check-auth');
      console.log(!!response.data.user.id);
      console.log(response.data);
      this.userId = response.data.user.id;
      this.userRole = response.data.user.role;
      this.isLogged = true;
      this.userName = response.data.user.username;
      console.log(this.userName);

      this.favoriteTracks = response.data.favorites;
      // if (!isAuthorized) {
      //   this.isLogged = false;
      //   return false;
      // }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export class UsersStore {
  private appUsers = [];
  private errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public get users() {
    return this.appUsers;
  }

  public get error(): string {
    return this.errorMessage
  }

  public set users(users) {
    this.appUsers = users;
  }

  public set error(error: string) {
    this.errorMessage = error;
  }

  async removeUser(userId: string) {
    try {
      await $api.delete('/users/' + userId)
      this.appUsers = this.appUsers.filter(user => user._id !== userId);
    } catch (error) {
      console.log(error);
    }
  }
}

export class AlbumsStore {
  private musicAlbums: IAlbum[] = [];
  private errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public get albums(): IAlbum[] {
    return this.musicAlbums;
  }

  public get error(): string {
    return this.errorMessage
  }

  public set albums(albums: IAlbum[]) {
    this.musicAlbums = albums;
  }

  public set error(error: string) {
    this.errorMessage = error;
  }

  async fetchAlbums() {
    try {
      const {data} = await $api.get('/albums/all/' + userStore.id);
      this.albums = data;
      return data
    } catch (error) {
      this.error = error;
    }
  }

  async searchAlbums(query: string) {
    try {
      const {data} = await $api.get(`/albums/search?query=${query}`);
      this.albums = data;
      return data
    } catch (error) {
      this.error = error;
    }
  }

  async removeAlbum(albumId: string) {
    try {
      await $api.delete('/albums/' + albumId)
      this.musicAlbums = this.musicAlbums.filter(album => album._id !== albumId);
    } catch (error) {
      console.log(error);
    }
  }
}

export class PlaylistsStore {
  private userPlaylists: IPlaylist[] = [];
  private errorMessage: string = '';
  // private playlist: IPlaylist;

  constructor() {
    makeAutoObservable(this);
  }

  public get playlists() {
    return this.userPlaylists;
  }
  // public get currentPlaylist() {
  //   return this.playlist;
  // }

  public get error(): string {
    return this.errorMessage
  }

  public set playlists(playlists) {
    this.userPlaylists = playlists;
  }

  public set error(error: string) {
    this.errorMessage = error;
  }

  async fetchPlaylists() {
    try {
      const {data} = await $api.get('/playlists');
      this.playlists = data;
      return data
    } catch (error) {
      this.error = error;
    }
  }

  async searchPlaylists(query: string) {
    try {
      const {data} = await $api.get(`/playlists/search?query=${query}`);
      this.playlists = data;
      return data
    } catch (error) {
      this.error = error;
    }
  }

  async removePlaylist(playlistId: string) {
    try {
      const deletedPlaylistId = await $api.delete('/playlists/' + playlistId)
      this.userPlaylists = this.userPlaylists.filter(playlist => playlist._id !== playlistId)
    } catch (error) {
      console.log(error);

    }
  }

  async removeTrackFromPlaylist(playlistId: string, trackId: string) {
    try {
      const response = await $api.post('/playlists/delete-track', {
        playlistId,
        trackId,
      })
      // this.currentPlaylist.tracks = this.currentPlaylist.tracks.filter(track => track._id !== trackId);
      // this.currentPlaylist = response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export class RecommendsStore {
  private userRecommends: IRecommend[] = [];
  private errorMessage: string = '';
  // private playlist: IPlaylist;

  constructor() {
    makeAutoObservable(this);
  }

  public get recommends() {
    return this.userRecommends;
  }
  // public get currentPlaylist() {
  //   return this.playlist;
  // }

  public get error(): string {
    return this.errorMessage
  }

  public set recommends(recommends) {
    this.userRecommends = recommends;
  }

  public set error(error: string) {
    this.errorMessage = error;
  }

  async fetchRecommends() {
    try {
      const {data} = await $api.get('/recommends');
      this.recommends = data;
      return data
    } catch (error) {
      this.error = error;
    }
  }

  async removeRecommend(recommendId: string) {
    try {
      const deletedRecommendId = await $api.delete('/recommends/' + recommendId)
      this.userRecommends = this.userRecommends.filter(recommend => recommend._id !== recommendId)
    } catch (error) {
      console.log(error);
    }
  }

  async removeTrackFromRecommend(recommendId: string, trackId: string) {
    try {
      const response = await $api.post('/recommends/delete-track', {
        recommendId,
        trackId,
      })
      // this.currentPlaylist.tracks = this.currentPlaylist.tracks.filter(track => track._id !== trackId);
      // this.currentPlaylist = response.data;
    } catch (error) {
      console.log(error);
    }
  }
}



export class AddTracksToPlaylistStore {
  tracks: ITrack[] = []

  constructor() {
    makeAutoObservable(this);
  }

  async getUnaddedTracks(playlistId: string, type: string) {
    const response = await $api.post('/tracks/' + playlistId, {type});
    this.tracks = response.data;
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

  getNextTrackIndex(trackId: string) {
    const currentTrackIndex = this.musicTracks.findIndex(track => track._id === trackId);
    console.log(currentTrackIndex);

    const nextTrackIndex = this.musicTracks[currentTrackIndex + 1] ? currentTrackIndex + 1 : 0;
    console.log(nextTrackIndex);

    return nextTrackIndex;
  }

  async fetchTracks(): Promise<any> {
    try {
      const {data} = await axios.get('http://localhost:5000/tracks', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('response: ', data);

      this.tracks = data;
      return data;
    }
    catch(error) {
      console.log(error);

    }
  }

  async removeTrack(trackId: string) {
    try {
      const deletedTrackId = await $api.delete('/tracks/' + trackId)
      this.musicTracks = this.musicTracks.filter(track => track._id !== trackId)
    } catch (error) {

    }
  }
}

export class PlayerStore {
  private currentPlayerTime = 0;
  private activeTrack: ITrack | null = null;
  private volumePlayer = 50;
  private paused = true;
  private isCollapsed = false;

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
    this.currentPlayerTime = 0;
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
export const usersStore = new UsersStore();
export const playerStore = new PlayerStore();
export const tracksStore = new TracksStore();
export const albumsStore = new AlbumsStore();
export const playlistsStore = new PlaylistsStore();
export const recommendsStore = new RecommendsStore();