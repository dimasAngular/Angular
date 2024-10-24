import { Profile } from './../../data/services/interfaces/profile.interface';
import { Component, input } from '@angular/core';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
   profile = input<Profile>()
}
