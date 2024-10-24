import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, SubscriberCardComponent , CommonModule, ImgUrlPipe, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    profileService = inject(ProfileService)


    subscribers$ = this.profileService.getSubscibesShortlist()

  
  menuItems = [
      {
        label:'Моя страница',
        ion:'Vector',
        link: 'profile/me'
      },
      {
        label:'чаты',
        ion:'chat',
        link: 'chats'
      },
      {
        label:'поиск',
        ion: 'search',
        link: 'search'
      },
    ]
id: any;
me = this.profileService.me


ngOnInit(){
firstValueFrom(this.profileService.getMe())
}

}
