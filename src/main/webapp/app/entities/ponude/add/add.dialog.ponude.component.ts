import {Component, Inject, OnInit} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

import { IPonude } from 'app/entities/ponude/ponude.model';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";
import {PonudjaciService} from "app/entities/ponudjaci/service/ponudjaci.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'jhi-add.dialog.ponude',
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogPonudeComponent implements OnInit{
  ponude?: IPonude[];
  ponudjacis?: IPonudjaci[];
  editForm = this.fb.group({
    id: [],
    sifraPostupka: [null, [Validators.required]],
    sifraPonude: [null, [Validators.required]],
    brojPartije: [null, [Validators.required]],
    nazivProizvodjaca: [],
    zastceniNaziv: [],
    ponudjenaVrijednost: [null, [Validators.required]],
    rokIsporuke: [null, [Validators.required]],
    datumPonude: [],
    ponudjaci: [null, [Validators.required]],
  });
  constructor(
    public dialogRef: MatDialogRef<AddDialogPonudeComponent>,
    protected ponudjaciService: PonudjaciService,
    protected fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IPonude,
    public ponudeSevice: PonudeService
  ) {}
  loadAll(): void {
    this.ponudeSevice.query().subscribe((res: HttpResponse<IPonude[]>) => {
      this.ponude = res.body ?? [];
    });
  }

  public getAllPonudjaci(): void {
    this.ponudjaciService.ponudjaciAll().subscribe((res: IPonudjaci[]) => {
      this.ponudjacis = res;

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.ponudeSevice.create(this.data).subscribe();

  }

  ngOnInit(): void {
    this.getAllPonudjaci();
  }
}
