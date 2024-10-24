import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Profile } from './interfaces/profile.interface';
import { Pageble } from './interfaces/pageble-interface';
import { map, tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  baseUrl:string = 'https://icherniakov.ru/yt-course/'

  constructor() { }
    getTestAccount()  {
      return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`)
    }

    me = signal<Profile | null>(null)

    getMe(){
      return this.http.get<Profile>(`${this.baseUrl}account/me`).pipe(
        tap(res => this.me.set(res))
      )
    }

    getAccount(id : string ){
      return this.http.get<Profile>(`${this.baseUrl}account/${id}`)
    }




    getSubscibesShortlist(subsAmount: number = 3) {
      return this.http.get<Pageble<Profile>>(`${this.baseUrl}account/subscriptions/`).pipe(
  
            map(res => res.items.slice(0 , subsAmount))
        )
    }



patchProfile(profile: Partial<Profile>){
  return this.http.patch<Profile>(`${this.baseUrl}account/me` , profile)
}


  }

