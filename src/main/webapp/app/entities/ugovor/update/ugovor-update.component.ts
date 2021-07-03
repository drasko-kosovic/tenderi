import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-ugovor-update',
  templateUrl: './ugovor-update.component.html',
  styleUrls: ['./ugovor.scss'],
})
export class UgovorUpdateComponent implements OnInit {
  isSaving = false;
  ponudjacis?: IPonudjaci[];
  ugovori?: IUgovor[];
  nadji?: any;
  editForm: FormGroup;

  constructor(
    protected ugovorService: UgovorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<UgovorUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    { id, brojUgovora, datumUgovora, brojDatumOdlukeIzbora, iznosUgovoraBezPdf, sifraPostupka, sifraPonude, ponudjaci }: Ugovor
  ) {
    this.editForm = this.fb.group({
      id: [id],
      brojUgovora: [brojUgovora, [Validators.required]],
      datumUgovora: [datumUgovora, [Validators.required]],
      brojDatumOdlukeIzbora: [brojDatumOdlukeIzbora, [Validators.required]],
      iznosUgovoraBezPdf: [iznosUgovoraBezPdf, [Validators.required]],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      ponudjaci: [ponudjaci, [Validators.required]],
      sifraPonude: [sifraPonude, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ugovor }) => {
      this.updateForm(ugovor);
      this.getAllPonudjaci();
    });
  }
  public getAllPonudjaci(): void {
    this.ponudjaciService.ponudjaciAll().subscribe((res: IPonudjaci[]) => {
      this.ponudjacis = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  previousState(): void {
    window.history.back();
  }

  public confirmAdd(): void {
    const ugovor = this.createFromForm();
    this.subscribeToSaveResponse(this.ugovorService.create(ugovor));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const ugovor = this.createFromForm();
    if (ugovor.id !== undefined) {
      this.subscribeToSaveResponse(this.ugovorService.update(ugovor));
    } else {
      this.subscribeToSaveResponse(this.ugovorService.create(ugovor));
    }
  }
  close(): any {
    this.dialogRef.close();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUgovor>>): void {
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

  protected updateForm(ugovor: IUgovor): void {
    this.editForm.patchValue({
      id: ugovor.id,
      brojUgovora: ugovor.brojUgovora,
      datumUgovora: ugovor.datumUgovora,
      brojDatumOdlukeIzbora: ugovor.brojDatumOdlukeIzbora,
      iznosUgovoraBezPdf: ugovor.iznosUgovoraBezPdf,
      sifraPostupka: ugovor.sifraPostupka,
      sifraPonude: ugovor.sifraPonude,
      ponudjaci: ugovor.ponudjaci,
    });
  }

  protected createFromForm(): IUgovor {
    return {
      ...new Ugovor(),
      id: this.editForm.get(['id'])!.value,
      brojUgovora: this.editForm.get(['brojUgovora'])!.value,
      datumUgovora: this.editForm.get(['datumUgovora'])!.value,
      brojDatumOdlukeIzbora: this.editForm.get(['brojDatumOdlukeIzbora'])!.value,
      iznosUgovoraBezPdf: this.editForm.get(['iznosUgovoraBezPdf'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      ponudjaci: this.editForm.get(['ponudjaci'])!.value,
    };
  }
}
