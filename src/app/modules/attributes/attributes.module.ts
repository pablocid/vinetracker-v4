import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from '../../components/attributes/attribute.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BaseComponent } from '../../components/attributes/base/base.component';
import { SelectionComponent } from '../../components/attributes/base/selection/selection.component';
import { SelectionImgComponent } from '../../components/attributes/base/selection-img/selection-img.component';
import { ObservationsComponent } from '../../components/attributes/observations/observations.component';
import { MultipleSelectionComponent } from '../../components/attributes/base/multiple-selection/multiple-selection.component';
import { NotesComponent } from '../../components/attributes/base/notes/notes.component';
import { NumericListComponent } from '../../components/attributes/base/numeric-list/numeric-list.component';
import { ImageCaptureComponent } from '../../components/attributes/base/image-capture/image-capture.component';
import { ImagePickerComponent } from '../../components/image-picker/image-picker.component';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';


const inputs = [
  BaseComponent, SelectionComponent, SelectionImgComponent,
  ObservationsComponent, MultipleSelectionComponent, NotesComponent, NumericListComponent, ImageCaptureComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageToDataUrlModule
  ],
  exports: [
    AttributeComponent,
  ],
  declarations: [
    AttributeComponent,
    ImagePickerComponent,
    ...inputs
  ],
  entryComponents: [
    ...inputs
  ]
})
export class AttributesModule { }
