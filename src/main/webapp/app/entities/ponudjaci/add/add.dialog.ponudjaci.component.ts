import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'jhi-add.dialog.postupci',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogPonudjaciComponent {
  ponudjaci?: IPonudjaci[];
  isSaving = false;
  editForm = this.fb.group({
    id: [],
    nazivPonudjaca: [],
    odgovornoLice: [],
    adresaPonudjaca: [],
    bankaRacun: [],
  });
  constructor(
    public dialogRef: MatDialogRef<AddDialogPonudjaciComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPonudjaci,
    public ponudjaciService: PonudjaciService,
    protected fb: FormBuilder
  ) {}
  previousState(): void {
    window.history.back();
  }
  loadAll(): void {
    this.ponudjaciService.query().subscribe((res: HttpResponse<IPonudjaci[]>) => {
      this.ponudjaci = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.ponudjaciService.create(this.data).subscribe();

  }


}
