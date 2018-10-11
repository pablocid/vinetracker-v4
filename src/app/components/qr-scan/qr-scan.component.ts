import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { QrScannerService } from '../../services/qr/scanner';
import { Options, ImageResult } from 'ngx-image2dataurl';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'qr-scan',
    templateUrl: 'qr-scan.component.html'
})

export class QrScanComponent implements OnInit {
    constructor(
        private qrScanner: QrScannerService,
        private alertController: AlertController
    ) { }

    public get options(): Options {
        return {
            resize: {
                maxHeight: 400,
                maxWidth: 400
            },
            allowedExtensions: ['JPG', 'jpeg', 'PnG']
        };
    }

    @Output() code = new EventEmitter<string>();
    @ViewChild('inputPhoto') inputPhoto: ElementRef;
    ngOnInit() { }

    public async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Error de lectura',
            message: 'Por favor intenta escanear nuevamente',
            buttons: ['OK']
        });

        await alert.present();
    }

    public async selected(img: ImageResult) {
        const r = await this.qrScanner.scann(img.resized.dataURL);
        console.log('result', r);
        if (r) {
            this.code.emit(r.data);
        } else {
            this.presentAlert();
            this.code.emit(null);
        }
    }

    public take() {
        this.inputPhoto.nativeElement.click();
    }
}
