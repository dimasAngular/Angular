import { Routes } from '@angular/router';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePagesComponent } from './pages/profile-pages/profile-pages.component';
import { LayoutComponent } from './common_ui/layout/layout.component';
import { canActivateAuth } from './auth/access-guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const routes: Routes = [
    {path: '' , component:LayoutComponent , children:[
        {path: '' , component:SearchPageComponent },
        {path: 'profile/:id', component:  ProfilePagesComponent},
        {path: 'settings', component:  SettingsPageComponent},
    ],
    canActivate: [canActivateAuth]
},
    {path: 'login', component: LoginPagesComponent},
];
