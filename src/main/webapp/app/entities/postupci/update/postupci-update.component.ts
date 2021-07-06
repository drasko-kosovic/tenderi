import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPostupci, Postupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";

@Component({
  selector: 'jhi-postupci-update',
  templateUrl: './postupci-update.component.html',
  styleUrls: ['./update.postupci.scss'],
})
export class PostupciUpdateComponent implements OnInit {
  isSaving = false;
  editForm: FormGroup;

  constructor(
    protected postupciService: PostupciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<PostupciUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, sifraPostupka, brojTendera, opisPostupka, vrstaPostupka, datumObjave }: Postupci
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      brojTendera: [brojTendera, [Validators.required]],
      opisPostupka: [opisPostupka, [Validators.required]],
      vrstaPostupka: [vrstaPostupka, [Validators.required]],
      datumObjave: [datumObjave],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ postupci }) => {
      this.updateForm(postupci);
    });
  }
  previousState(): void {
    // window.history.back();
    this.router.navigate(['/postupci']);
  }
  public confirmAdd(): void {
    const postupci = this.createFromForm();
    this.subscribeToSaveResponse(this.postupciService.create(postupci));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const postupci = this.createFromForm();
    if (postupci.id !== undefined) {
      this.subscribeToSaveResponse(this.postupciService.update(postupci));
    } else {
      this.subscribeToSaveResponse(this.postupciService.create(postupci));
    }
  }
  close(): any {
    this.dialogRef.close();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostupci>>): void {
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

  protected updateForm(postupci: IPostupci): void {
    this.editForm.patchValue({
      id: postupci.id,
      sifraPostupka: postupci.sifraPostupka,
      brojTendera: postupci.brojTendera,
      opisPostupka: postupci.opisPostupka,
      vrstaPostupka: postupci.vrstaPostupka,
      datumObjave: postupci.datumObjave,
    });
  }

  protected createFromForm(): IPostupci {
    return {
      ...new Postupci(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojTendera: this.editForm.get(['brojTendera'])!.value,
      opisPostupka: this.editForm.get(['opisPostupka'])!.value,
      vrstaPostupka: this.editForm.get(['vrstaPostupka'])!.value,
      datumObjave: this.editForm.get(['datumObjave'])!.value,
    };
  }
}
