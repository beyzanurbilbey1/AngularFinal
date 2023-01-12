import { DetayComponent } from './components/detay/detay.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';
import { IlanlarComponent } from './components/ilanlar/ilanlar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { HotToastModule } from '@ngneat/hot-toast'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IlanlarComponent,
    KategorilerComponent,
    UyelerComponent,
    LoginComponent,
    IlanlarComponent,
    DetayComponent,
    ProfilComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
