import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';

@Component({
  selector: 'jhi-add.dialog',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPostupci,
    public postupciService: PostupciService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.postupciService.create(this.data).subscribe();
    // window.location.reload();
  }
}
