import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-tenderi-home',
  templateUrl: './tenderi-home.component.html',
})
export class TenderiHomeComponent implements OnInit {
  public sifra?: any;
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sifra = this.activatedRoute.snapshot.params['foo'];
  }
}
