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

  user_saved() {
    const message = 'Vous avez été enregistré avec succès';
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

  savedRemoved() {
    const message = 'Courriel supprimé';
    this.openSnack(message);
  }

  flowRemoved() {
    const message = 'Courriel supprimé';
    this.openSnack(message);
  }

  emailRemoved() {
    const message = 'Message supprimé';
    this.openSnack(message);
  }

  openSnack(message) {
    this.snackBar.open(message, '', this.getConfig());
  }

}
