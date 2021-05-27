import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeDetailComponent } from './detail/tenderi-home-detail.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PonudeModule } from 'app/entities/ponude/ponude.module';
import { ViewVrednovanjeModule } from 'app/entities/view-vrednovanje/view-vrednovanje.module';
import { PrvorangiraniModule } from 'app/entities/prvorangirani/prvorangirani.module';
import { HvalePonudeModule } from 'app/entities/hvale-ponude/hvale-ponude.module';
import { SpecifikacijeModule } from 'app/entities/specifikacije/specifikacije.module';

@NgModule({
  imports: [
    SharedModule,
    TenderiHomeRoutingModule,
    MatTabsModule,
    PonudeModule,
    ViewVrednovanjeModule,
    PrvorangiraniModule,
    HvalePonudeModule,
    SpecifikacijeModule,
  ],
  declarations: [TenderiHomeComponent, TenderiHomeDetailComponent],
})
export class TenderiHomeModule {}
