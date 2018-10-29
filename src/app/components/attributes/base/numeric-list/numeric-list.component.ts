import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-numeric-list',
  templateUrl: './numeric-list.component.html',
  styleUrls: ['./numeric-list.component.scss']
})
export class NumericListComponent extends BaseComponent {
  public min: number;
  public max: number;
  public step: number;
  public unit: string;
  config$: Observable<{ min: number; max: number; step: number; unit: string; }>;
  constructor() { super(); }

  protected _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => attr.value));
    this.editViewValue = this.attribute$.pipe(map(attr => attr.editValue));

    this.config$ = this.attribute$.pipe(map(attr => {

      let min = this.getAttr(attr.config, 'minVal', 'number');
      let max = this.getAttr(attr.config, 'maxVal', 'number');
      let step = this.getAttr(attr.config, 'step', 'number');

      min = !isNaN(min) ? min : 0;
      max = !isNaN(max) ? max : 10;
      step = !isNaN(step) ? step : 1;
      const unit = this.getAttr(attr.config, 'unit', 'string');
      return { min, max, step, unit };
    }));

  }

  onChangeValue($event) {
    console.log('$event', $event.detail.value);
    this.update({ editValue: $event.detail.value });
  }

}
