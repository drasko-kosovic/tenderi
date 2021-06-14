import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-tenderi-home',
  templateUrl: './tenderi-home.component.html',
  styleUrls: ['./tenderi-home.components.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TenderiHomeComponent implements OnInit {
  public sifra?: any;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sifra = this.activatedRoute.snapshot.params['foo'];
  }
}
