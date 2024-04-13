import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IFriend} from "../entities/friend.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAllFriends(): Observable<IFriend[]> {
    return this.http.get<any>(`${environment.server}/friends`)
      .pipe(
        map((res) => res.data)
      );
  }

  getFriendById(id: number | string): Observable<IFriend> {
    return this.http.get<any>(`${environment.server}/friends/${id}`)
      .pipe(
        map((res) => res.data)
      );
  }

  updateFriend(id: string | number, name: string, gender: string): Observable<IFriend> {
    return this.http.put<any>(`${environment.server}/friends/${id}`, {name, gender})
      .pipe(
        map((res) => res.data)
      );
  }
}
