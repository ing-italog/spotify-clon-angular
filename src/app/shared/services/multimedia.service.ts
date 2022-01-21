import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callBack: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerpercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  //myObservable$ : BehaviorSubject<any> = new BehaviorSubject('Agua');

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(respOk => {
      if (respOk) {
        this.setAudio(respOk);
      }

    })

    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.playerStatus, false);
    this.audio.addEventListener('play', this.playerStatus, false);
    this.audio.addEventListener('pause', this.playerStatus, false);
    this.audio.addEventListener('ended', this.playerStatus, false);
  }

  private setPercentage(currentTime: number, duration: number): void {
    //Duration = 100%, currentTime = X, (currentTime * 100) /duration
    let percentage = (currentTime * 100) / duration;
    this.playerpercentage$.next(percentage);
  }

  private playerStatus = (state: any) => {
    switch (state.type) { //TODO: -->> playing
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;

    }
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()

  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeReaiming(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displaFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displaFormat)
  }

  private setTimeReaiming(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displaFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displaFormat)

  }


  public setAudio(track: TrackModel): void {
    this.audio.src = `http://localhost:3001/${track.url}`
    this.audio.play()
  }
}
