import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import { ISpecifikacije } from 'app/entities/specifikacije/specifikacije.model';
import { SpecifikacijeService } from 'app/entities/specifikacije/service/specifikacije.service';

@Component({
  selector: 'jhi-add.dialog',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogSpecifikacijeComponent {
  specifikacije?: ISpecifikacije[];
  constructor(
    public dialogRef: MatDialogRef<AddDialogSpecifikacijeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISpecifikacije,
    public specifikacijeService: SpecifikacijeService
  ) {}
  loadAll(): void {
    this.specifikacijeService.query().subscribe((res: HttpResponse<ISpecifikacije[]>) => {
      this.specifikacije = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.specifikacijeService.create(this.data).subscribe();

  }
}
