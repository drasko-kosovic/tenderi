import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PonudjaciComponent } from './list/ponudjaci.component';
import { PonudjaciDetailComponent } from './detail/ponudjaci-detail.component';
import { PonudjaciUpdateComponent } from './update/ponudjaci-update.component';
import { PonudjaciDeleteDialogComponent } from './delete/ponudjaci-delete-dialog.component';
import { PonudjaciRoutingModule } from './route/ponudjaci-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddDialogPonudjaciComponent } from 'app/entities/ponudjaci/add/add.dialog.ponudjaci.component';

@NgModule({
  imports: [SharedModule, PonudjaciRoutingModule, MatTableModule, MatPaginatorModule],
  declarations: [
    PonudjaciComponent,
    PonudjaciDetailComponent,
    PonudjaciUpdateComponent,
    PonudjaciDeleteDialogComponent,
    AddDialogPonudjaciComponent,
  ],
  entryComponents: [PonudjaciDeleteDialogComponent],
})
export class PonudjaciModule {}
