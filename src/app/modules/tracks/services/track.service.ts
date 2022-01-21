import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import {  observable, Observable, of } from 'rxjs';
import { map, mergeMap, catchError }  from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  private skipById(listTracks: TrackModel[], id: number):Promise<TrackModel[]>{
    return new Promise((resolve, rejects) => {
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`, {
    })
    .pipe(
      map(({data}: any) => {
        return data
      })
    );
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap(({data}: any) => this.skipById(data, 1)),
      catchError((err) => {
        const {status, statusText} = err;
        console.log('Algo sucedio Revisame', [status, statusText])
        return of([])
      })
    );
  }


}
