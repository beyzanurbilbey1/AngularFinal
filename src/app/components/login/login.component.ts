import { Router } from '@angular/router';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  OturumAc(mail: string, parola: string) {
    this.fbServis.OturumAc(mail, parola)
      .pipe(
        this.htoast.observe({
          success: 'Oturum Açıldı',
          loading: 'Oturum Açılıyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
  OturumAcGoogle() {
    this.fbServis.GoogleSignUp().pipe(
      this.htoast.observe({
        loading: "Oturum Açılıyor...",
        success: "Oturum Açıldı ",
        error: ({ message }) => `Hata => ${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['']);
    })
  }
  OturumAcFace() {
    this.fbServis.FacebookSignUp().pipe(
      this.htoast.observe({
        loading: "Oturum Açılıyor...",
        success: "Oturum Açıldı ",
        error: ({ message }) => `Hata => ${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['']);
    })
  }
}

