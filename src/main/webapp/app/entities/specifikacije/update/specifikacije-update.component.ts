import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISpecifikacije, Specifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Postupci } from 'app/entities/postupci/postupci.model';

@Component({
  selector: 'jhi-specifikacije-update',
  templateUrl: './specifikacije-update.component.html',
  styleUrls: ['./specifikacije-update.scss'],
})
export class SpecifikacijeUpdateComponent implements OnInit {
  isSaving = false;
  editForm: FormGroup;

  constructor(
    protected specifikacijeService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<SpecifikacijeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      id,
      sifraPostupka,
      brojPartije,
      atc,
      inn,
      farmaceutskiOblikLijeka,
      jacinaLijeka,
      trazenaKolicina,
      pakovanje,
      procijenjenaVrijednost,
    }: Specifikacije
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      brojPartije: [brojPartije, [Validators.required]],
      atc: [atc],
      inn: [inn],
      farmaceutskiOblikLijeka: [farmaceutskiOblikLijeka],
      jacinaLijeka: [jacinaLijeka],
      trazenaKolicina: [trazenaKolicina, [Validators.required]],
      pakovanje: [pakovanje],
      procijenjenaVrijednost: [procijenjenaVrijednost, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specifikacije }) => {
      this.updateForm(specifikacije);
    });
  }

  previousState(): void {
    // window.history.back();
    this.router.navigate(['/specifikacije']);
  }
  public confirmAdd(): void {
    const specifikacije = this.createFromForm();
    this.subscribeToSaveResponse(this.specifikacijeService.create(specifikacije));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const specifikacije = this.createFromForm();
    if (specifikacije.id !== undefined) {
      this.subscribeToSaveResponse(this.specifikacijeService.update(specifikacije));
    } else {
      this.subscribeToSaveResponse(this.specifikacijeService.create(specifikacije));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecifikacije>>): void {
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

  protected updateForm(specifikacije: ISpecifikacije): void {
    this.editForm.patchValue({
      id: specifikacije.id,
      sifraPostupka: specifikacije.sifraPostupka,
      brojPartije: specifikacije.brojPartije,
      atc: specifikacije.atc,
      inn: specifikacije.inn,
      farmaceutskiOblikLijeka: specifikacije.farmaceutskiOblikLijeka,
      jacinaLijeka: specifikacije.jacinaLijeka,
      trazenaKolicina: specifikacije.trazenaKolicina,
      pakovanje: specifikacije.pakovanje,
      procijenjenaVrijednost: specifikacije.procijenjenaVrijednost,
    });
  }

  protected createFromForm(): ISpecifikacije {
    return {
      ...new Specifikacije(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      atc: this.editForm.get(['atc'])!.value,
      inn: this.editForm.get(['inn'])!.value,
      farmaceutskiOblikLijeka: this.editForm.get(['farmaceutskiOblikLijeka'])!.value,
      jacinaLijeka: this.editForm.get(['jacinaLijeka'])!.value,
      trazenaKolicina: this.editForm.get(['trazenaKolicina'])!.value,
      pakovanje: this.editForm.get(['pakovanje'])!.value,
      procijenjenaVrijednost: this.editForm.get(['procijenjenaVrijednost'])!.value,
    };
  }
}
