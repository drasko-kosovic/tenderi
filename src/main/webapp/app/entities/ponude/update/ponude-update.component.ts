import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
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
export class PonudeUpdateComponent implements OnInit {
  isSaving = false;
  ponudjacis?: IPonudjaci[];

  // editForm = this.fb.group({
  //   id: [],
  //   sifraPostupka: [null, [Validators.required]],
  //   sifraPonude: [null, [Validators.required]],
  //   brojPartije: [null, [Validators.required]],
  //   // nazivPonudjaca: [null, [Validators.required]],
  //   nazivProizvodjaca: [],
  //   zastceniNaziv: [],
  //   ponudjenaVrijednost: [null, [Validators.required]],
  //   rokIsporuke: [null, [Validators.required]],
  //   datumPonude: [],
  //   ponudjaci: [null, [Validators.required]],
  // });

  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<PonudeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponude }) => {

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
  updateEdit(): void {
    this.ponudeService.update(this.data).subscribe();
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonude>>): void {
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


}
