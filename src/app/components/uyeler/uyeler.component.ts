import { switchMap } from 'rxjs';

import { FbservisService } from './../../services/fbservis.service';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uyeler',
  templateUrl: './uyeler.component.html',
  styleUrls: ['./uyeler.component.css']
})
export class UyelerComponent implements OnInit {
  uye = this.fbservis.AktifUyeBilgi;
  uyeler!: Uye[]; //uye tipinde diziler
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;

  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl(),
    yetki: new FormControl(),
    parola: new FormControl(),
    yas: new FormControl(),
    adres: new FormControl(),


  });

  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.UyeListele()
    console.log(this.uyeler)
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }


  UyeListele() {
    this.fbservis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });

  }

  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    if (!uye.uid) {
      this.fbservis.KayitOl(this.frm.value.email, this.frm.value.parola).pipe(
        switchMap(({ user: { uid } }) =>
          this.fbservis.UyeEkle({
            uid,
            displayName: this.frm.value.displayName,
            email: this.frm.value.email,
            yetki: this.frm.value.yetki,
            yas: this.frm.value.yas,
            adres: this.frm.value.adres,
            parola: this.frm.value.parola,
          })
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      ).subscribe()
      this.modal.toggle()
    } else {
      this.fbservis.UyeDuzenle(uye).pipe(
        this.htoast.observe({
          success: 'Üye Güncellendi',
          loading: 'Güncelleniyor...',
          error: ({ message }) => `${message}`,
        })
      ).subscribe()
      this.modal.toggle()
    }
  }

  UyeSil() {
    this.fbservis.UyeSil(this.secUye).then(() => {

    })
    this.modal.toggle()

  }

}


