import { switchMap } from 'rxjs';
import { FbservisService } from './../../services/fbservis.service';

import { Kategori } from './../../models/Kategori';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {
  kategoriler!: Kategori[];
  modal!: bootstrap.Modal;
  modalBaslik: string = "";
  secKat!: Kategori;
  frm: FormGroup = new FormGroup({
    kategoriId: new FormControl(),
    kategoriAdi: new FormControl(),

  });


  constructor(
    public fbservis: FbservisService

  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: Kategori, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Kategori, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }


  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });

  }

  KategoriEkleDuzenle() {
    var kategori: Kategori = this.frm.value
    if (!kategori.kategoriId) {
      this.fbservis.KategoriEkle(kategori).then(() => { })
      this.modal.toggle()
    } else {
      this.fbservis.KategoriDuzenle(kategori).then(() => { })
      this.modal.toggle()
    }
  }

  KategoriSil() {
    this.fbservis.KategoriSil(this.secKat).then(() => {

    })
    this.modal.toggle()

  }

}