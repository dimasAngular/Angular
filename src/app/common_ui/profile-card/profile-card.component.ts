import { Component, Input, input } from '@angular/core';
import { Profile } from './../../data/services/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";


@Component({
  selector: 'profile-card',
  standalone: true,
  imports: [ImgUrlPipe,],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() profile!: Profile; // Определяем входное свойство
}
