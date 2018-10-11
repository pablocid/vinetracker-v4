import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectionPage } from './selection.page';
import { RowsModalComponent } from '../../components/rows-modal/rows-modal.component';
import { QrScanComponent } from '../../components/qr-scan/qr-scan.component';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';

const routes: Routes = [
  {
    path: '',
    component: SelectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ImageToDataUrlModule
  ],
  declarations: [SelectionPage, RowsModalComponent, QrScanComponent],
  entryComponents: [RowsModalComponent]

})
export class SelectionPageModule {}
