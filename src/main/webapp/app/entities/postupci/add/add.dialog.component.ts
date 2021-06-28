import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-add.dialog.postupci',

  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogPostupciComponent {
  postupaks?: IPostupci[];
  constructor(
    public dialogRef: MatDialogRef<AddDialogPostupciComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPostupci,
    public postupciService: PostupciService
  ) {}
  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.postupaks = res.body ?? [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.loadAll();
  }

  public confirmAdd(): void {
    this.postupciService.create(this.data).subscribe();
    // window.location.reload();

  }
}
