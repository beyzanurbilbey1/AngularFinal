import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uye = this.fbseris.AktifUyeBilgi;
  constructor(
    public fbseris: FbservisService,
    public router: Router,
    public htoast: HotToastService
  ) { }
  ngOnInit(): void {
  }
  OturumKapat() {
    this.fbseris.OturumKapat().pipe(
      this.htoast.observe({
        loading: "Çıkış Yapılıyor",
        success: "Çıkış Yapıldı",
        error: ({ message }) => `Hata => ${message}`
      })
    ).subscribe();
    this.router.navigate(['login'])
  }
}
