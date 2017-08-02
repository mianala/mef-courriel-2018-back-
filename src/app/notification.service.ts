import {Injectable} from '@angular/core';
import {MdSnackBar} from "@angular/material";


@Injectable()
export class NotificationService {

  getConfig() {
    return {
      duration: 4000,
    }
  }

  constructor(public snackBar: MdSnackBar) {

  }

  emailSent() {
    const message = 'Courriel envoyé avec succès';
    this.snackBar.open(message, "", this.getConfig());
  }
  emailSaved() {
    const message = 'Courriel enregistré avec succès';
    this.snackBar.open(message, "", this.getConfig());
  }

}
