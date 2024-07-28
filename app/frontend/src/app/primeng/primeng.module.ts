import { NgModule } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  exports: [
    DialogModule,
    TabViewModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
  ],
})
export class PrimengModule {}
