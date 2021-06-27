import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { HttpResponse } from '@angular/common/http';
import { ISpecifikacije } from 'app/entities/specifikacije/specifikacije.model';
import { SpecifikacijeService } from 'app/entities/specifikacije/service/specifikacije.service';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';

@Component({
  selector: 'jhi-add.dialog',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent {
  ponude?: IPonude[];
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPonude,
    public ponudeSevice: PonudeService
  ) {}
  loadAll(): void {
    this.ponudeSevice.query().subscribe((res: HttpResponse<IPonude[]>) => {
      this.ponude = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.ponudeSevice.create(this.data).subscribe();
    window.location.reload();
    // this.loadAll();
  }
}
