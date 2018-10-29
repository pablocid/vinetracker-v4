import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttributePage } from './attribute.page';
import { AttributesModule } from '../../modules/attributes/attributes.module';

const routes: Routes = [
  {
    path: '',
    component: AttributePage
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
    AttributePage
  ]
})
export class AttributePageModule {}
