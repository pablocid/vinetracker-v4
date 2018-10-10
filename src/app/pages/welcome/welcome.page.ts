import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserService } from '../../store/user';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.page.html',
    styleUrls: ['welcome.page.scss']
})

export class WelcomePage implements OnInit {
    loader;
    constructor(
        public loadingController: LoadingController,
        public alertController: AlertController,
        public userS: UserService
    ) {
    }

    async presentLoading() {
        if (this.loader) { this.loadingController.dismiss(); }
        this.loader = await this.loadingController.create({
            message: ' verificando'
        });
        return await this.loader.present();
    }

    ngOnInit() { }

    async login() {
        const alert = await this.alertController.create({
            header: 'Registrate',
            subHeader: 'control de acceso',
            message: 'Entra con tu email y contraseña',
            inputs: [
                { name: 'email', placeholder: 'myemail@gmail.com', type: 'email', label: 'email', value: 'admin@agroinformatica.cl' },
                { name: 'password', type: 'password', placeholder: '*** password ***', value: 'cid123'},
            ],
            buttons: [
                { text: 'Cancel', handler: data => { } },
                { text: 'Login', handler: data => this.auth(data) }
            ]
        });

        await alert.present();
    }

    logout() {
        this.userS.logout();
    }

    private async auth(data) {
        this.presentLoading();

        try {
            await this.userS.auth(data);
            this.loadingController.dismiss();
        } catch (e) {
            this.loadingController.dismiss();
            this.loginError(e);
        }

    }

    async loginError(e: any) {
        // console.log('error', e);
        const alert = await this.alertController.create({
            header: 'Error de autenticación',
            subHeader: 'sin acceso',
            message: e,
            buttons: ['OK']
        });

        await alert.present();
    }
}

