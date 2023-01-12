import { FbservisService } from './../../services/fbservis.service';
import { ActivatedRoute } from '@angular/router';
import { Ilan } from './../../models/Ilan';
import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.component.html',
  styleUrls: ['./detay.component.css']
})
export class DetayComponent implements OnInit {
  secIlan!: Ilan;
  ilanId!: string;
  ilanlar!: Ilan[];
  constructor(public route: ActivatedRoute,
    public fbServis: FbservisService) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      this.ilanId = p.ilId;
      this.ilanGetir()
    });
  }

  ilanGetir() {
    this.fbServis.IlanById(this.ilanId).subscribe((d) => {
      console.log(d[0]);
      this.secIlan = d[0];
    })
  }

}
