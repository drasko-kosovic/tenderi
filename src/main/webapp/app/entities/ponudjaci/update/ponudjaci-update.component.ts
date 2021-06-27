import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonudjaci, Ponudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PonudeUpdateComponent } from 'app/entities/ponude/update/ponude-update.component';

@Component({
  selector: 'jhi-ponudjaci-update',
  templateUrl: './ponudjaci-update.component.html',
  styleUrls: ['./ponudjaci-update.scss'],
})
export class PonudjaciUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nazivPonudjaca: [null, [Validators.required]],
    odgovornoLice: [null, [Validators.required]],
    adresaPonudjaca: [],
    bankaRacun: [],
  });

  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<PonudeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponudjaci }) => {
      this.updateForm(ponudjaci);
    });
  }
  updateEdit(): void {
    this.ponudjaciService.update(this.data).subscribe();
  }
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ponudjaci = this.createFromForm();
    if (ponudjaci.id !== undefined) {
      this.subscribeToSaveResponse(this.ponudjaciService.update(ponudjaci));
    } else {
      this.subscribeToSaveResponse(this.ponudjaciService.create(ponudjaci));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonudjaci>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
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
