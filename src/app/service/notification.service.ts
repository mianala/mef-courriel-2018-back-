import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class NotificationService {

  getConfig() {
    return {
      duration: 4000,
    }
  }

  constructor(public snackBar: MatSnackBar) {

  }


  connected() {
    const message = 'Vous ête connecté';
    this.openSnack(message);
  }

  print(p: string) {
    const message = p;
    this.openSnack(message);
  }

  userSaved() {
    const message = 'Vous avez été enregistré avec succès';
    this.openSnack(message);
  }

  loggedOut() {
    const message = 'Vous ête déconnecté';
    this.openSnack(message);
  }

  notAnImage() {
    const message = 'Veillez utiliser une photo';
    this.openSnack(message);
  }

  projectSaved() {
    const message = 'Projet enregistré avec succès';
    this.openSnack(message);
  }

  threadDispatched() {
    const message = 'Le courriel a été dispatché';
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

  flowReceived() {
    const message = 'Vous avez recu un courriel';
    this.openSnack(message);
  }

  flowTreated() {
    const message = 'Courriel traité';
    this.openSnack(message);
  }
  flowExported() {
    const message = 'Courriel exporté';
    this.openSnack(message);
  }
  flowImported() {
    const message = 'Courriel importé';
    this.openSnack(message);
  }

  projectTreated() {
    const message = 'Projet traité';
    this.openSnack(message);
  }

  invalidReceiver() {
    const message = 'Veillez bien verifier les destinataires';
    this.openSnack(message);
  }
  invalidObservation() {
    const message = 'Veillez bien verifier les observations';
    this.openSnack(message);
  }
  invalidTitle() {
    const message = 'Veillez bien verifier les observations';
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

  formError() {
    const message = 'Veuillez bien remplir le formulaire';
    this.openSnack(message);
  }

  fileTooHeavy() {
    const message = 'Fichier trop volumineux';
    this.openSnack(message);
  }

  noFile() {
    const message = 'Fichier';
    this.openSnack(message);
  }

  openSnack(message) {
    this.snackBar.open(message, '', this.getConfig());
  }

  answered() {
    const message = 'Courriel envoyé';
    this.snackBar.open(message, '', this.getConfig());
  }

  sent() {
    const message = 'Courriel envoyé';
    this.snackBar.open(message, '', this.getConfig());
  }

}
