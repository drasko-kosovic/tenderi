import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { IPonudjaci, Ponudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'jhi-ponudjaci-update',
  templateUrl: './ponudjaci-update.component.html',
  styleUrls: ['./ponudjaci-update.scss'],
})
export class PonudjaciUpdateComponent implements OnInit{
  ponudjacis?: IPonudjaci[];
  isSaving = false;
  editForm: FormGroup;
  nazivPonudjaca: string | undefined;
  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private dialogRef: MatDialogRef<PonudjaciUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nazivPonudjaca = data.nazivPonudjaca;
    this.editForm = this.fb.group({
      id: [],
      nazivPonudjaca: [data.nazivPonudjaca, [Validators.required]],
      odgovornoLice: [data.odgovornoLice, [Validators.required]],
      adresaPonudjaca: [data.adresaPonudjaca],
      bankaRacun: [data.bankaRacun],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponudjaci }) => {
      this.updateForm(ponudjaci);
    });
  }

  close(): any {
    this.dialogRef.close();
  }
  protected updateForm(ponudjaci: IPonudjaci): void {
    this.editForm.patchValue({
      id: ponudjaci.id,
      nazivPonudjaca: ponudjaci.nazivPonudjaca,
      odgovornoLice: ponudjaci.odgovornoLice,
      adresaPonudjaca: ponudjaci.adresaPonudjaca,
      bankaRacun: ponudjaci.bankaRacun,

    });
  }
  protected createFromForm(): IPonudjaci {
    return {
      ...new Ponudjaci(),
      id: this.editForm.get(['id'])!.value,
      nazivPonudjaca: this.editForm.get(['nazivPonudjaca'])!.value,
      odgovornoLice: this.editForm.get(['odgovornoLice'])!.value,
      adresaPonudjaca: this.editForm.get(['adresaPonudjaca'])!.value,
      bankaRacun: this.editForm.get(['bankaRacun'])!.value,

    };
  }
}
