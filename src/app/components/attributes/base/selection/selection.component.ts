import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent extends BaseComponent {
  options$: Observable<any>;

  constructor(
    public actionSheetController: ActionSheetController,
    public cdr: ChangeDetectorRef
  ) { super(); }

  protected _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.value, 'string');
    }));
    this.editViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.editValue, 'string');
    }));

    this.options$ = this.attribute$.pipe(map( attr =>  {
      return this.getAttr(attr.config, 'options', 'listOfObj');
    }));
  }

  async buttons() {
    const btns = await this.options$.pipe(take(1)).toPromise();
    const buttons = btns.map(o => {
      return {
        text: o.string,
        handler: () => {
          console.log(o.id);
          this.update({editValue: o.id});
          this.cdr.detectChanges();
        }
      };
    });

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel');
      }
    });
    return buttons;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: await this.description.pipe(take(1)).toPromise(),
      buttons: await this.buttons()
    });
    await actionSheet.present();
  }

}
