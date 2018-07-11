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
    document.addEventListener('DOMContentLoaded', function () {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });
  }

  notify(message){
    let notification = new Notification('DGBCOURRIEL',{
      icon:'../../assets/img/logo.png',
      body:message
    })
  }


  connected() {
    const message = 'Vous ête connecté';
    this.openSnack(message);
    this.notify(message)
  }

  print(p: string) {
    const message = p;
    this.openSnack(message);
    this.notify(message)
  }

  userSaved() {
    const message = 'Vous avez été enregistré avec succès';
    this.openSnack(message);
    this.notify(message)
  }

  loggedOut() {
    const message = 'Vous ête déconnecté';
    this.openSnack(message);
    this.notify(message)
  }

  notAnImage() {
    const message = 'Veillez utiliser une photo';
    this.openSnack(message);
  }

  projectSaved() {
    const message = 'Nouveau projet enregistré';
    this.openSnack(message);
    this.notify(message)
  }

  projectEdited() {
    const message = 'Projet modifié avec succès';
    this.openSnack(message);
  }

  threadDispatched() {
    const message = 'Courriel dispatché';
    this.openSnack(message);
  }

/*  emailSaved() {
    const message = 'Nouveau courriel enregistré';
    this.openSnack(message);
    this.notify(message)
  }*/

  emailSent() {
    const message = 'Courriel envoyé avec succès';
    this.openSnack(message);
    this.notify(message)
  }

  flowReceived() {
    const message = 'Vous avez reçu un courriel';
    this.openSnack(message);
    this.notify(message)
  }

  flowTreated() {
    const message = 'Un courriel a été traité';
    this.openSnack(message);
    this.notify(message)
  }

  flowExported() {
    const message = 'Un courriel a été exporté';
    this.openSnack(message);
    this.notify(message)
  }

  flowImported() {
    const message = 'Courriel importé';
    this.openSnack(message);
    this.notify(message)
  }

  projectTreated() {
    const message = 'Un projet a été traité';
    this.openSnack(message);
    this.notify(message)
  }

  invalidReceiver() {
    const message = 'Veillez bien verifier les destinataires';
    this.openSnack(message);
    this.notify(message)
  }

  invalidObservation() {
    const message = 'Veillez bien verifier les observations';
    this.openSnack(message);
    this.notify(message)
  }


  emailRemoved() {
    const message = 'Message supprimé';
    this.openSnack(message);
    this.notify(message)
  }

  formError() {
    const message = 'Veuillez bien remplir le formulaire';
    this.openSnack(message);
    this.notify(message)
  }

  fileTooHeavy() {
    const message = 'Fichier trop volumineux';
    this.openSnack(message);
    this.notify(message)
  }

  noFile() {
    const message = 'Fichier';
    this.openSnack(message);
    this.notify(message)
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
