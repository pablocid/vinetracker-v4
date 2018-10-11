import { Injectable } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';

@Injectable({
    providedIn: 'root'
})
export class QrScannerService {

    constructor() { }

    async scann(dataUrl: string): Promise<QRCode> {
        let ImgD;
        try {
            ImgD = await this.convertURIToImageData(dataUrl);
            if (!ImgD.data) { return; }
        } catch (error) {
            console.log('ERROR', error);
        }
        try {
            const qr = jsQR(ImgD.data, ImgD.width, ImgD.height);
            return qr;
        } catch (e) {
            return e;
        }
    }

    private convertURIToImageData(URI): Promise<ImageData> {
        return new Promise(function (resolve, reject) {
            if (URI === null) { return reject(); }
            const canvas = document.createElement('canvas'),
                context = canvas.getContext('2d'),
                image = new Image();
            image.addEventListener('load', function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(context.getImageData(0, 0, canvas.width, canvas.height));
            }, false);
            image.src = URI;
        });
    }
}
