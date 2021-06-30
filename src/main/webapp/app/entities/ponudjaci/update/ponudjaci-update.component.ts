import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonudjaci, Ponudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-ponudjaci-update',
  templateUrl: './ponudjaci-update.component.html',
  styleUrls: ['./ponudjaci-update.scss'],
})
export class PonudjaciUpdateComponent {
  isSaving = false;
  editForm: FormGroup;
  nazivPonudjaca: string | undefined;
  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private dialogRef: MatDialogRef<PonudjaciUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, nazivPonudjaca, odgovornoLice, adresaPonudjaca, bankaRacun }: Ponudjaci
  ) {
    this.nazivPonudjaca = nazivPonudjaca;
    this.editForm = this.fb.group({
      id: [],
      nazivPonudjaca: [nazivPonudjaca, [Validators.required]],
      odgovornoLice: [odgovornoLice, [Validators.required]],
      adresaPonudjaca: [adresaPonudjaca],
      bankaRacun: [bankaRacun],
    });
  }

  updateEdit(): void {
    this.ponudjaciService.update(this.editForm.value.id).subscribe();
  }

  save(): any {
    this.dialogRef.close(this.editForm.value);
  }

  close(): any {
    this.dialogRef.close();
  }
}
