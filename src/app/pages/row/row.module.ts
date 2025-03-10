import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RowPage } from './row.page';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { PlantListComponent } from '../../components/plant-list/plant-list.component';

const routes: Routes = [
  {
    path: '',
    component: RowPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RowPage, ReversePipe, PlantListComponent]
})
export class RowPageModule {}
