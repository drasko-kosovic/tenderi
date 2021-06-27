import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';

@Component({
  selector: 'jhi-add.dialog.postupci',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogPonudjaciComponent {
  ponudjaci?: IPonudjaci[];
  constructor(
    public dialogRef: MatDialogRef<AddDialogPonudjaciComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPonudjaci,
    public ponudjaciService: PonudjaciService
  ) {}
  loadAll(): void {
    this.ponudjaciService.query().subscribe((res: HttpResponse<IPonudjaci[]>) => {
      this.ponudjaci = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.ponudjaciService.create(this.data).subscribe();
    window.location.reload();
    // this.loadAll();
  }
}
