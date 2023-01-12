import { SignupComponent } from './components/signup/signup.component';
import { DetayComponent } from './components/detay/detay.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IlanlarComponent } from './components/ilanlar/ilanlar.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { LoginComponent } from './components/login/login.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { ProfilComponent } from './components/profil/profil.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "ilanlar", component: IlanlarComponent,
   
  },
  {
    path: "kategoriler", component: KategorilerComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "uyeler", component: UyelerComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "login", component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: "ilanlar", component: IlanlarComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "ilanlar/:katId", component: IlanlarComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "detaylar/:ilId", component: DetayComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "detaylar", component: DetayComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "signup", component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'profil', component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
