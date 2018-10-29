import { Injectable } from '@angular/core';
import {
    Stitch,
    RemoteMongoClient,
    StitchAppClient,
    RemoteMongoDatabase,
    StitchUser,
    StitchAuthListener,
    UserPasswordCredential,
    StitchServiceError
} from 'mongodb-stitch-browser-sdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StitchService {
    private static appName = 'vinetracker-ckxia'; // 'cherrytracker-scnzl';
    private static dbName = 'heroku_240bqtmh'; // 'CherryTracker';
    public client: StitchAppClient;
    public database: RemoteMongoDatabase;
    public credential: UserPasswordCredential;
    private listener: StitchAuthListener;
    public user$: BehaviorSubject<StitchUser>;
    public isLoggedIn$: BehaviorSubject<boolean>;

    constructor() {
        this.client = Stitch.initializeDefaultAppClient(StitchService.appName);
        this.database = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(StitchService.dbName);
        this.credential = new UserPasswordCredential('', '');
        this.user$ = new BehaviorSubject(this.client.auth.user);
        this.isLoggedIn$ = new BehaviorSubject(this.client.auth.isLoggedIn);
        this.setListener();

    }

    public get hastRedirect(): boolean {
        return this.client.auth.hasRedirectResult();
    }

    public get isLoggedIn(): boolean {
        return this.client.auth.isLoggedIn;
    }

    public infoUser(): Promise<{ id: string, role: string, email: string, pic: string }> {
        return this.client.callFunction('infoUser', []);
    }

    private async setListener() {
        console.log('setting listener');
        this.listener = {
            onAuthEvent: (event) => {
                if (!event.isLoggedIn) { console.log('Event logout'); }
                if (event.isLoggedIn) { console.log('Event login'); }
                this.isLoggedIn$.next(event.isLoggedIn);
            }
        };

        if (this.client.auth.hasRedirectResult()) {
            await this.handleRedirect();
            this.client.auth.addAuthListener(this.listener);
        } else {
            this.client.auth.addAuthListener(this.listener);
        }

    }

    public async auth(creds: { email: string, password: string }): Promise<StitchUser> {
        if (!creds) { return; }
        this.credential = new UserPasswordCredential(creds.email, creds.password);
        return await this.client.auth.loginWithCredential(this.credential);

    }

    public async handleRedirect() {
        if (!this.client.auth.hasRedirectResult()) { return; }
        const user = await this.client.auth.handleRedirectResult();
        this.user$.next(user);
        this.setListener();
    }

    public async logout() {
        await this.client.auth.logout();
        localStorage.clear();
    }

    public records() {
        return this.database.collection('records');

    }

    public getHilera(query) {
        console.log('hilera query', JSON.stringify(query));
        return this.client.callFunction('hilera', [...query, 'heroku_240bqtmh']);
    }

    private convertImageToBSONBinaryObject(file: File, dataUrl?: string): Promise<{ $binary: { base64: string, subType: string } }> {
        return new Promise(resolve => {

            if (dataUrl) {
                const result = {
                    $binary: {
                        base64: dataUrl.split(',')[1],
                        subType: '00'
                    }
                };
                resolve(result);
                return;
            }

            const fileReader = new FileReader();
            fileReader.onload = (event: any) => {
                resolve({
                    $binary: {
                        base64: event.target.result.split(',')[1],
                        subType: '00'
                    }
                });
            };
            fileReader.readAsDataURL(file);
        });
    }

    public async handleFileUpload(file: File, options?: { fileName?: string, resizeDataUrl?: string }) {
        // name of the file with extension
        let key = file.name;
        if (!file) { return; }

        // if resize
        const rs64 = options ? options.resizeDataUrl : undefined;

        // custome name without extension
        if (options && options.fileName) {
            const pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            const match = (file.name).match(pattern);
            key = options.fileName + match[0].toLowerCase();
        }
        // convert to extended json
        const result = await this.convertImageToBSONBinaryObject(file, rs64);

        // uploading the image
        const response = await this.client.callFunction('pmgvphotos', [key, file.type, result]);
        return response;
    }

    public async deleteFile(key: string) {
        const response = await this.client.callFunction('anaphotodelete', [key]);
        return response;
    }

    public assessments() {
        return this.client.callFunction('getAssessments', []);
    }

    public updateAttr(idRef: string, schm: string, attrId: string, datatype: string, value: any) {
        return this.client.callFunction('updateAttr', [idRef, schm, attrId, datatype, value]);
    }

    public fromScanToSelection(code): Promise<{ e: number, h: number, p: number }> {
        return this.client.callFunction('EHPfromScan', [code]);
    }

}
