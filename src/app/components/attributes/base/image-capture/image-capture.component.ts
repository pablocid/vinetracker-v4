import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { map, take } from 'rxjs/operators';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ImageShowComponent } from '../../../image-show/image-show.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageResult } from 'ngx-image2dataurl';
import { StitchService } from '../../../../services/mongodb-stitch/mongodb-stitch.service';
import * as UUID from 'uuid';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss']
})
export class ImageCaptureComponent extends BaseComponent {
  public numOfPics: Observable<number>;
  public currentNumOfPics: Observable<number>;
  public local$: BehaviorSubject<any[]>;
  public bucketUrl = 'https://s3.amazonaws.com/pmgv-files-test/';
  public bucketUrlThumb = 'https://s3.amazonaws.com/pmgv-files-test/thumbnails/';
  public fileHolder = [];
  public theFile;
  public uploading: boolean;
  constructor(
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private stitch: StitchService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.local$ = new BehaviorSubject([]);
  }


  protected _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => {
      if (!Array.isArray(attr.value)) { return []; }
      return attr.value.map(img => {
        return {
          url: this.bucketUrl + img,
          thumbnail: this.bucketUrlThumb + img.substr(0, img.lastIndexOf('.')) + '.jpg'
        };
      });
    }));

    // this.listViewLabel = this.attrValue.pipe(map(x => {
    //   if (!Array.isArray(x)) { return []; }
    //   return x.map(img => {
    //     return {
    //       url: this.bucketUrl + img,
    //       thumbnail: this.bucketUrlThumb + img.substr(0, img.lastIndexOf('.')) + '.jpg'
    //     };
    //   });
    // }));

    // this.editViewValue = this.attribute$.pipe(map(x => x.editValue));

    // this.setInitialEditValue();

    this.numOfPics = this.attribute$
      .pipe(map(x => x.config))
      .pipe(map(config => {
        return this.getAttr(config, 'numOfPics', 'number') ? this.getAttr(config, 'numOfPics', 'number') : 1;
      }));

    this.currentNumOfPics = this.listViewValue.pipe(map(x => x.length));
    // this.local$.next(this.initPicArray());

    this.listViewValue.subscribe(x => console.log('listViewValue', x));
  }

  // initPicArray() {
  //   if (isNaN(this.numOfPics) || this.numOfPics === 0) {
  //     return [];
  //   }
  //   const pics = Array.from(Array(this.numOfPics), () => 0);
  //   const current = Array.isArray(this.subject.value) ? this.subject.value : [];
  //   // console.log(pics, current);

  //   const mod = pics.map((x, i) => {
  //     return {
  //       url: current[i] ? this.bucketUrl + current[i] : undefined,
  //       thumbnail: current[i] ? this.bucketUrlThumb + current[i] : undefined,
  //       status: current[i] ? 'exist' : 'empty'
  //     };
  //   });
  //   console.log('mod', mod);
  //   return mod;
  // }

  // async setInitialEditValue() {
  //   const editValue = await this.attribute$.pipe(map(attr => {
  //     let value = attr.value;
  //     let numOfPics = this.getAttr(attr.config, 'numOfPics', 'number');
  //     if (isNaN(numOfPics)) { numOfPics = 1; }
  //     if (!Array.isArray(value)) { value = []; }
  //     const edit = [];
  //     for (let i = 0; i < numOfPics; i++) {
  //       edit.push({
  //         url: typeof value[i] === 'string' ? this.bucketUrl + value[i] : undefined,
  //         thumbnail: typeof value[i] === 'string' ? this.bucketUrlThumb + value[i] : undefined,
  //         status: typeof value[i] === 'string' ? 'exist' : 'empty'
  //       });
  //     }
  //     return edit;
  //   })).pipe(take(1)).toPromise();
  //   this.update({ editValue });

  // }

  // async updateLocal(url, index, status) {

  //   const edit = await this.editViewValue.pipe(take(1)).toPromise();
  //   if (!edit) { return; }
  //   const list = [...edit];

  //   const result = {
  //     url: url ? this.bucketUrl + url : undefined,
  //     thumbnail: url ? this.bucketUrlThumb + url : undefined,
  //     status
  //   };
  //   list[index] = result;

  //   this.update({ editValue: list });

  // }

  async updateStatus(index, status) {

    const edit = await this.editViewValue.pipe(take(1)).toPromise();
    if (!edit) { return; }
    const list = [...edit];

    const result = {
      ...list[index],
      status
    };
    list[index] = result;

    this.update({ editValue: list });

  }

  buttons(url, i) {
    const buttons = [
      {
        text: 'Ver foto',
        handler: () => {
          this.presentModal(url);
        }
      },
      {
        text: 'Eliminar foto',
        handler: () => {
          this.DeleteConfirm(i);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];
    return buttons;
  }

  async DeleteConfirm(i) {
    const alert = await this.alertController.create({
      header: 'Eliminar fotografía!',
      message: 'Si eliminas la fotografía no podrás recuperarla',
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
          handler: async () => {
            console.log('Delete', i);
            this.delete(i);
          }
        }
      ]
    });

    await alert.present();
  }

  async delete(index) {
    this.uploading = true;
    const current = await this.attribute$.pipe(map(x => x.value)).pipe(take(1)).toPromise();
    console.log('Delete', current[index]);
    this.save({ value: [current[index]], options: { pop: true } });
    this.cdr.detectChanges();
  }

  async presentActionSheet(url, i) {
    const actionSheet = await this.actionSheetController.create({
      header: await this.description.pipe(take(1)).toPromise(),
      buttons: this.buttons(url, i)
    });
    await actionSheet.present();
  }

  async presentModal(url) {
    const modal = await this.modalController.create({
      component: ImageShowComponent,
      componentProps: { url }
    });

    await modal.present();
    const diss = await modal.onDidDismiss();
    console.log('dissmissed', diss);
  }

  // onSelect($event: ImageResult, index) {
  //   console.log('event', $event);
  //   this.fileHolder[index] = $event;
  //   this.updateLocal(null, index, 'upload');
  // }

  onCapture($event: ImageResult) {
    console.log('event', $event);
    this.theFile = $event;
    this.cdr.detectChanges();
  }

  async upload(index) {
    const current = await this.editViewValue.pipe(take(1)).toPromise();
    const file = this.fileHolder[index];

    if (
      Array.isArray(current) &&
      current[index] &&
      current[index].status === 'upload' &&
      file &&
      file.resized
    ) {
      await this.updateStatus(index, 'uploading');
      const response = await <Promise<{ ETAG: string, url: string, key: string }>>this.selected(file);
      console.log('response', response);
      this.save({ value: [response.key], options: { push: true } });
      // setTimeout(() => {
      //   this.updateLocal(response.key, index, 'exist');
      // }, 2000);

    } else {
      console.log('no se puede guardar la imagen');
    }
  }

  async uploadAndSave() {
    console.log('uploadAndSave', 'clicked');
    this.uploading = true;
    const response = await <Promise<{ ETAG: string, url: string, key: string }>>this.selected(this.theFile);
    this.save({ value: [response.key], options: { push: true } });
    this.theFile = undefined;

  }

  cancelPhoto() {
    this.theFile = undefined;
  }

  public async selected(img: ImageResult) {
    console.log('img', img);

    const name = UUID();
    const res = await this.stitch.handleFileUpload(img.file, {
      resizeDataUrl: img.resized.dataURL,
      fileName: name
    });
    return res;
  }

  async updateNewValue(newValue, options) {
    const oldValue = await this.attribute$.pipe(map(x => x.value)).pipe(take(1)).toPromise();

    if (options && Array.isArray(newValue)) {
      if (options.push) {
        if (oldValue) {
          newValue = [...oldValue, ...newValue];
        }
      }
      if (options.pop) {
        newValue = oldValue.filter(function (e) { return this.indexOf(e) === -1; }, newValue);
      }

    }
    console.log('newVale', newValue);
    if (options.delete) {
      this.update({ value: [] });
      return;
    }
    setTimeout(async () => {
      this.update({ value: newValue });
      this.uploading = false;
      this.cdr.detectChanges();
    }, 3000);
  }

}
