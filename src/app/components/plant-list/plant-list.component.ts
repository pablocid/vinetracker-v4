import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { RowService } from '../../store/row';

@Component({
  selector: 'plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantListComponent implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private rowS: RowService,
    private cdr: ChangeDetectorRef
  ) { }

  @Input() rowsConfig;
  @Input() editable: boolean;
  @Output() assess = new EventEmitter();
  @Output() changeDetection = new EventEmitter();

  // templates
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('fen1') fen1: TemplateRef<any>;
  @ViewChild('bix') bix: TemplateRef<any>;
  @ViewChild('fen0') fen0: TemplateRef<any>;

  ngOnInit() {
    this.setTemplate(this.rowsConfig.type);
  }

  trackById(index, item) {
    return item.id;
  }

  private setTemplate(type: number) {
    if (type === 3) {
      try { this.entry.createEmbeddedView(this.fen1); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    if (type === 2) {
      try { this.entry.createEmbeddedView(this.bix); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    if (type === 1) {
      try { this.entry.createEmbeddedView(this.fen0); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    // this.cdr.detectChanges();
  }

  public setColor(row) {
    if (row.discard) { return { item: 'danger', btn: 'light' }; }
    if (!row.assessable) { return { item: 'light', btn: 'light', style: { color: 'rgb(150,150,150)' } }; }
    // if (row.selected) { return { item: 'success', btn: 'light' }; }
    if (row.created) { return { item: 'primary', btn: 'light' }; }

    return { item: '', btn: 'primary' };
  }

  public assessment(id) {
    console.log('liked', id);
    this.assess.emit(id);
  }

  public buttonsMore(row) {
    const btns = [];
    btns.push({
      text: 'Evaluar',
      role: 'create',
      icon: 'create',
      handler: () => {
        this.assessment(row.id);
      }
    });

    if (this.rowsConfig.type === 1) {
      btns.push({
        text: 'Planta sin racimos',
        icon: 'radio-button-off',
        handler: () => {
          this.zeroClusterConfirm(row.id);
        }
      });

      btns.push({
        text: 'Descartar planta',
        icon: 'remove-circle',
        handler: () => {
          this.discardPlantConfirm(row.id);
        }
      });
    }

    if (this.rowsConfig.type === 2) {
      btns.push({ text: '18º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 18) });
      btns.push({ text: '17º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 17) });
      btns.push({ text: '16º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 16) });
      btns.push({ text: '15º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 15) });
      btns.push({ text: '14º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 14) });
      btns.push({ text: '13º Brix', icon: 'speedometer', handler: () => this.brixConfirm(row.id, 13) });
    }
    btns.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    return btns;
  }

  async more(row) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: this.buttonsMore(row)
    });
    await actionSheet.present();
  }

  async zeroClusterConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Planta sin racimo!',
      // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: async () => {
            console.log('Confirm Okay');
            await this.rowS.updateAttr(id, '5808d1e9d48d17001006e43c', 0, {});
            this.changeDetection.emit();
          }
        }
      ]
    });

    await alert.present();
  }

  async discardPlantConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Deseas descartar esta planta ?',
      // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, descartar',
          handler: async () => {
            console.log('Confirm Okay');
            await this.rowS.updateEntity(id, '5bd14b4bd71ef20014e4b327', 'no_selected', {});
            this.changeDetection.emit();
          }
        }
      ]
    });

    await alert.present();
  }

  async brixConfirm(id, value) {
    const alert = await this.alertController.create({
      header: value + 'ºBrix',
      // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: async () => {
            console.log('Confirm Okay');
            await this.rowS.updateAttr(id, '57c84628ab66902c2208a855', value, {});
            this.changeDetection.emit();
          }
        }
      ]
    });

    await alert.present();
  }


}
