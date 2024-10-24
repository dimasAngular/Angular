import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../../common_ui/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProfileCardComponent,],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  title = 'tik-talk';
  profileService:ProfileService = inject(ProfileService)
  profiles:Profile [] = []

  constructor(){
    this.profileService.getTestAccount()
      .subscribe({
      next:(val: Profile[]) =>{
        this.profiles = val
      }
      })
  }
}
