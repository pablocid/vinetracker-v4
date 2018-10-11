import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Options, ImageResult } from 'ngx-image2dataurl';
import * as EXIF from 'exif-js';

@Component({
    selector: 'image-picker',
    templateUrl: 'image-picker.component.html'
})

export class ImagePickerComponent implements OnInit {
    public label = 'Tomar foto';
    constructor() { }

    public get options(): Options {
        return {
            resize: {
                maxHeight: 1000,
                maxWidth: 1000
            },
            allowedExtensions: ['JPG', 'jpeg', 'PnG']
        };
    }
    @Input('label') set labeling(l: string) {
        if (l) { this.label = l; }
    }

    @Output() selection = new EventEmitter();

    @ViewChild('inputPhoto') inputPhoto: ElementRef;

    ngOnInit() { }

    public take() {
        this.inputPhoto.nativeElement.click();
    }
    public async selected(img: ImageResult) {
        const exifInfo = await this.getExif(img.file);
        if (exifInfo && exifInfo.Orientation) {
            img.resized.dataURL = await this.resetOrientation(img.resized.dataURL, exifInfo.Orientation);
        }
        this.selection.emit(img);
    }

    private resetOrientation(srcBase64, srcOrientation): Promise<string> {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = function () {
                const width = img.width,
                    height = img.height,
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');

                // set proper canvas dimensions before transform & export
                if (4 < srcOrientation && srcOrientation < 9) {
                    canvas.width = height;
                    canvas.height = width;
                } else {
                    canvas.width = width;
                    canvas.height = height;
                }

                // transform context before drawing image
                switch (srcOrientation) {
                    case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                    case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                    case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                    case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                    case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                    case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                    case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                    default: break;
                }

                // draw image
                ctx.drawImage(img, 0, 0);

                // export base64
                resolve(canvas.toDataURL());
            };

            img.src = srcBase64;
        });

    }

    private getExif(file: File): any {
        return new Promise(resolve => {
            const ex: any = EXIF;
            ex.getData(file, function () {
                resolve(EXIF.getAllTags(this));
            });
        });
    }
}
