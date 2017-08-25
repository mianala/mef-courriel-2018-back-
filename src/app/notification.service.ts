import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';


@Injectable()
export class NotificationService {

  getConfig() {
    return {
      duration: 4000,
    }
  }

  constructor(public snackBar: MdSnackBar) {

  }


  connected() {
    const message = 'Vous ête connecté';
    this.openSnack(message);
  }

  loggedOut() {
    const message = 'Vous ête déconnecté';
    this.openSnack(message);
  }

  notAnImage() {
    const message = 'Veillez utiliser une image JPG';
    this.openSnack(message);
  }

  emailSaved() {
    const message = 'Courriel enregistré avec succès';
    this.openSnack(message);
  }

  emailSent() {
    const message = 'Courriel envoyé avec succès';
    this.openSnack(message);
  }

  openSnack(message) {
    this.snackBar.open(message, '', this.getConfig());
  }

}
