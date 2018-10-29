import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-selection',
  templateUrl: './multiple-selection.component.html',
  styleUrls: ['./multiple-selection.component.scss']
})
export class MultipleSelectionComponent extends BaseComponent {
  options$: Promise<any[]>;
  constructor() { super(); }

  setupOnInit() {
    this.valueIsSet$ = this.attribute$.pipe(map(x => x.value)).pipe(map(value => {
      if (!Array.isArray(value) || value === undefined || value === null) {
        return false;
      } else {
        return value.length === 0 ? false : true;
      }
    }));
    this.listViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      if (!Array.isArray(attr.value)) { return []; }
      return options.filter(x => attr.value.indexOf(x.id) !== -1).map(x => x.string);
    }));

    this.editViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      let editValue = attr.editValue;
      if (!Array.isArray(editValue)) { editValue = []; }
      return options.map(opt => {
        return {
          ...opt,
          selected: editValue.indexOf(opt.id) === -1 ? false : true
        };
      });
    }));

    this.options$ = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      let value = attr.value;
      if (!Array.isArray(value)) { value = []; }
      return options.map(opt => {
        return {
          ...opt,
          selected: value.indexOf(opt.id) === -1 ? false : true
        };
      });
    })).pipe(take(1)).toPromise();

  }

  async optionChange($event, option, index) {

    const currentValue = await this.editViewValue.pipe(take(1)).toPromise();
    console.log('currentValue', currentValue);
    currentValue[index].selected = $event.detail.checked;
    this.update({ editValue: currentValue.filter(x => x.selected).map(x => x.id) });
  }

}
