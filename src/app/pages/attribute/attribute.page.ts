import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeQuery, AttributeService, AttributeStore } from '../../store/attribute';
import { Location } from '@angular/common';
import { AttributeComponent } from '../../components/attributes/attribute.component';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { RowService } from '../../store/row';

@Component({
  selector: 'app-attribute-page',
  templateUrl: './attribute.page.html',
  styleUrls: ['./attribute.page.scss'],
})
export class AttributePage implements OnInit {
  public showSave: boolean;

  constructor(
    private attrQ: AttributeQuery,
    private attrS: AttributeService,
    private attrStore: AttributeStore,
    private rowS: RowService,
    private location: Location,
    private alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) { }

  @ViewChild(AttributeComponent) child: AttributeComponent;

  public activeAttr$ = this.attrQ.selectActiveId();

  ngOnInit() {
    this.showSave = this.attrQ.getActiveId() === '581a356c5c0eac001077ad6e' ? false : true;
  }
  public goBack() {
    this.location.back();
  }

  async goBackConfirm() {
    if (!this.showSave) {
      this.goBack();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Salir',
      message: 'Desea salir sin guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          handler: () => {
            console.log('Salir');
            this.attrStore.updateActive({ editValue: undefined });
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  public async save() {
    this.child.saveAndGoBack();
  }

  // public async saveSignalFromComponent($event) {
  //   console.log('$event save', $event);
  //   await this.attrS.updateActiveAttr($event.value, $event.options, false);
  // }

  async saveConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Desea guardar los cambios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: () => {
            this.save();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Eliminar atributo',
      message: 'Deseas eliminar el atributo ? ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ELIMINAR',
          role: 'delete',
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  delete() {
    this.child.deleteAndGoBack();
  }


  async more() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar atributo',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteConfirm();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
