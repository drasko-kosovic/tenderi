import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

import { IPonude } from 'app/entities/ponude/ponude.model';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';
import { UgovorService } from 'app/entities/ugovor/service/ugovor.service';
import { IUgovor } from 'app/entities/ugovor/ugovor.model';

@Component({
  selector: 'jhi-add.dialog.ponude',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogUgovorComponent {
  ugovor?: IUgovor[];
  constructor(
    public dialogRef: MatDialogRef<AddDialogUgovorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUgovor,
    public ugovorService: UgovorService
  ) {}
  loadAll(): void {
    this.ugovorService.query().subscribe((res: HttpResponse<IUgovor[]>) => {
      this.ugovor = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.ugovorService.create(this.data).subscribe();
    window.location.reload();
    // this.loadAll();
  }
}
