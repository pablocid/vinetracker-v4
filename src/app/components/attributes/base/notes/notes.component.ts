import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent extends BaseComponent {
  editViewValueStatic: Promise<any>;
  constructor(
    public cdr: ChangeDetectorRef
  ) { super(); }

  public textareaValue: string;

  _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => attr.value));
    this.editViewValue = this.attribute$.pipe(map(attr => attr.editValue));
    this.editViewValueStatic = this.editViewValue.pipe(take(1)).toPromise();
    this.editViewValueStatic.then(x => {
      this.textareaValue = x;
      this.cdr.detectChanges();
    });
  }

  onTAChange(event) {
    console.log('evnet', this.textareaValue);
    this.update({ editValue: this.textareaValue });
  }

}
