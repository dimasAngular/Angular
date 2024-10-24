import { Component, WritableSignal, inject, } from '@angular/core';
import { ProfileHeaderComponent } from "../../common_ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from "../../common_ui/svg-icon/svg-icon.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-pages',
  standalone: true,
  imports: [ProfileHeaderComponent, CommonModule, SvgIconComponent, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-pages.component.html',
  styleUrl: './profile-pages.component.css'
})
export class ProfilePagesComponent {
    profileService = inject(ProfileService)
    route = inject(ActivatedRoute)

    me$ = toObservable(this.profileService.me)

    subscribers$ = this.profileService.getSubscibesShortlist(5)

    profile$ = this.route.params.pipe(
      switchMap(({id}) => {
          if(id === 'me') return  this.me$
            return this.profileService.getAccount(id)
      })
    )
}


