import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssessPage } from './assess.page';
import { AttributesModule } from '../../modules/attributes/attributes.module';

const routes: Routes = [
  {
    path: '',
    component: AssessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AttributesModule
  ],
  declarations: [
    AssessPage,
  ]
})
export class AssessPageModule { }
