import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly Url = environment.apiUrl

  constructor(
    private http: HttpClient,
    private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {

    const body = {
      email,
      password
    }
    return this.http.post(`${this.Url}/auth/login`, body)
}
}
