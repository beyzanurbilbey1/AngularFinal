import { FormGroup, FormControl } from '@angular/forms';
import { concatMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  uye = this.fbservis.AktifUyeBilgi;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl(),
    yas: new FormControl(),
    yetki: new FormControl(),
    parola: new FormControl(),
  });
  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) {}

  ngOnInit() {
    this.fbservis.AktifUyeBilgi.subscribe((user) => {
      this.frm.patchValue({ ...user });
      console.log(user);
    });
  }
  Kaydet() {
    this.fbservis
      .UyeDuzenle(this.frm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: ({ message }) => `Hata=>${message}`,
        })
      )
      .subscribe();
  }

  ResimYukle(event: any, user: Uye) {
    this.fbservis
      .uploadImage(event.target.files[0], `images/profiles/${user.uid}`)
      .pipe(
        this.htoast.observe({
          loading: 'Fotoğraf Yükleniyor...',
          success: 'Fotoğraf yüklendi',
          error: 'Hata oluştu',
        }),
        concatMap((foto) => this.fbservis.UyeDuzenle({ uid: user.uid, foto }))
      )
      .subscribe();
  }
}