import { Component, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-ponude-update',
  templateUrl: './ponude-update.component.html',
  styleUrls: ['./ponude.update.scss'],
})
export class PonudeUpdateComponent {
  isSaving = false;
  ponudjacis?: IPonudjaci[];
  editForm: FormGroup;
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<PonudeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      id,
      sifraPostupka,
      sifraPonude,
      brojPartije,
      nazivProizvodjaca,
      zastceniNaziv,
      ponudjenaVrijednost,
      rokIsporuke,
      datumPonude,
      ponudjaci,
    }: Ponude
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      sifraPonude: [sifraPonude, [Validators.required]],
      brojPartije: [brojPartije, [Validators.required]],
      nazivProizvodjaca: [nazivProizvodjaca],
      zastceniNaziv: [zastceniNaziv],
      ponudjenaVrijednost: [ponudjenaVrijednost, [Validators.required]],
      rokIsporuke: [rokIsporuke, [Validators.required]],
      datumPonude: [datumPonude],
      ponudjaci: [ponudjaci, [Validators.required]],
    });
  }
  //
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(({ ponude }) => {
  //     this.getAllPonudjaci();
  //   });
  // }
  // public getAllPonudjaci(): void {
  //   this.ponudjaciService.ponudjaciAll().subscribe((res: IPonudjaci[]) => {
  //     this.ponudjacis = res;
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //   });
  // }
  // previousState(): void {
  //   window.history.back();
  // }
  public confirmAdd(): void {
    const ponude = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudeService.create(ponude));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const ponude = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudeService.update(ponude));
     }
  close(): any {
    this.dialogRef.close();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonude>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      // () => this.onSaveSuccess(),

    );
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
  protected createFromForm(): IPonude {
    return {
      ...new Ponude(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      nazivProizvodjaca: this.editForm.get(['nazivProizvodjaca'])!.value,
      zastceniNaziv: this.editForm.get(['zastceniNaziv'])!.value,
      ponudjenaVrijednost: this.editForm.get(['ponudjenaVrijednost'])!.value,
      rokIsporuke: this.editForm.get(['rokIsporuke'])!.value,
      ponudjaci: this.editForm.get(['ponudjaci'])!.value,
    };
  }
}
