import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SpecifikacijeComponent } from './list/specifikacije.component';
import { SpecifikacijeDetailComponent } from './detail/specifikacije-detail.component';
import { SpecifikacijeUpdateComponent } from './update/specifikacije-update.component';
import { SpecifikacijeDeleteDialogComponent } from './delete/specifikacije-delete-dialog.component';
import { SpecifikacijeRoutingModule } from './route/specifikacije-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AddDialogSpecifikacijeComponent } from 'app/entities/specifikacije/add/add.dialog.specifikacije.component';

@NgModule({
  imports: [SharedModule, SpecifikacijeRoutingModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTableExporterModule],
  declarations: [
    SpecifikacijeComponent,
    SpecifikacijeDetailComponent,
    SpecifikacijeUpdateComponent,
    SpecifikacijeDeleteDialogComponent,
    AddDialogSpecifikacijeComponent,
  ],
  entryComponents: [SpecifikacijeDeleteDialogComponent],
  exports: [SpecifikacijeComponent],
})
export class SpecifikacijeModule {}
