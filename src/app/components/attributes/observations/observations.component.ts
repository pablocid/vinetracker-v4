import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { MultipleSelectionComponent } from '../base/multiple-selection/multiple-selection.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent extends MultipleSelectionComponent {

  constructor(
    public actionSheetController: ActionSheetController,
    public cdr: ChangeDetectorRef
  ) { super(); }


  async optionChange($event, option, index) {

    const currentValue = await this.editViewValue.pipe(take(1)).toPromise();
    console.log('currentValue', currentValue);
    currentValue[index].selected = $event.detail.checked;
    this.update({ editValue: currentValue.filter(x => x.selected).map(x => x.id) });
  }

}
