import { FbservisService } from './../../services/fbservis.service';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import { Ilan } from './../../models/Ilan';
import { Kategori } from './../../models/Kategori';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Islem } from 'src/app/models/Islem';




@Component({
  selector: 'app-ilanlar',
  templateUrl: './ilanlar.component.html',
  styleUrls: ['./ilanlar.component.css']
})
export class IlanlarComponent implements OnInit {
  uye = this.fbservis.AktifUyeBilgi;
  ilanlar!: Ilan[];
  islemler!: Islem[];
  kategoriler!: Kategori[];
  modal!: Modal;
  // nIlanlar!:any; 
  modalBaslik: string = "";
  secIlan!: Ilan;
  katId!: string;
  secKat!: Kategori;
  kategoriId!: string;
  frm: FormGroup = new FormGroup({
    ilanId: new FormControl(),
    baslik: new FormControl(),
    aciklama: new FormControl(),
    fiyat: new FormControl(),
    m2: new FormControl(),
    odaSayi: new FormControl(),
    kat: new FormControl(),
    konum: new FormControl(),
    islemadi: new FormControl(),
    resim: new FormControl(),
    resim2: new FormControl(),
    resim3: new FormControl(),
    bilgi1: new FormControl(),
    bilgi2: new FormControl(),
    kategoriId: new FormControl(),
  });

  constructor(
    public fbservis: FbservisService,
    public Hatoast: HotToastService,

  ) { }

  ngOnInit() {
    // this.KategoriById()
    this.KategoriListele()
    this.IlanListele()

  }

  // KategoriSec(kategoriId: string) {
  //   this.kategoriId = kategoriId;
  //   this.KategoriById();
  // }


  // KategoriById() {
  //   this.fbservis.KategoriById(this.kategoriId).subscribe((d) => {
  //     this.secKat = d[0];
  //     this.IlanListele();
  //   });
  // }


  // KatSec(katId: string) {
  //   this.katId = katId;
  //   // this.KategoriGetir()
  //   // this.getTheForsales(katId)
  // }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "İlan Ekle";
    this.modal.show();
  }
  Duzenle(ilan: Ilan, el: HTMLElement) {
    this.frm.patchValue(ilan);
    this.modalBaslik = "İlan Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ilan: Ilan, el: HTMLElement) {
    this.secIlan = ilan;
    this.modalBaslik = "İlan Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }


  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });

  }

  IlanListele() {
    this.fbservis.IlanListele().subscribe(d => {
      this.ilanlar = d;
    });

  }

  IlanEkleDuzenle() {
    var ilan: Ilan = this.frm.value
    if (!ilan.ilanId) {
      this.fbservis.IlanEkle(ilan).then(() => { })
      this.modal.toggle()
    } else {
      this.fbservis.IlanDuzenle(ilan).then(() => { })
      this.modal.toggle()
    }
  }

  IlanSil() {
    this.fbservis.IlanSil(this.secIlan).then(() => {

    })
    this.modal.toggle()

  }
}
