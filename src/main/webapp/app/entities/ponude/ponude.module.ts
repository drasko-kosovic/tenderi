import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PonudeComponent } from './list/ponude.component';
import { PonudeDetailComponent } from './detail/ponude-detail.component';
import { PonudeUpdateComponent } from './update/ponude-update.component';
import { PonudeDeleteDialogComponent } from './delete/ponude-delete-dialog.component';
import { PonudeRoutingModule } from './route/ponude-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteSelectedComponent } from './delete-selected/delete-selected.component';
import { AddDialogPonudeComponent } from 'app/entities/ponude/add/add.dialog.ponude.component';

@NgModule({
  imports: [SharedModule, PonudeRoutingModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTableExporterModule, NgPipesModule],
  declarations: [
    PonudeComponent,
    PonudeDetailComponent,
    PonudeUpdateComponent,
    PonudeDeleteDialogComponent,
    DeleteSelectedComponent,
    AddDialogPonudeComponent,
  ],
  entryComponents: [PonudeDeleteDialogComponent],
  exports: [PonudeComponent],
})
export class PonudeModule {}
