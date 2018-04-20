import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() {
  }

  //if need to add add at the bottom of the list please
  static   observations = [
    'POUR LECTURE TOURNANTE',
    'M\'EN FAIRE UNE NOTE',
    'M\'EN PARLER AU TELEPHONE',
    'POUR AVIS',
    'ME REPRESENTER',
    'GARDER EN INSTANCE',
    'ME PARLER',
    'POUR CLASSEMENT',
    'POUR OBSERVATION',
    'POUR SIGNATURE',
    'VOTRE ATTENTION',
    'NOTER ET CLASSER',
    'DOSSIER TRES IMPORTANTS',
    'POUR LA SUITE A DONNER',
    'POUR ATTRIBUTION',
    'POUR INFORMATION',
    'ME RENDRE COMPTE',
    'VENIR M\'EN PARLER',
    'POUR PROCEDURE A SUIVRE',
    'POUR ETUDE ET M\'EN PARLER',
    'POUR APPROBATION',
    'PROJET A REDIGER',
    'COMME CONVENU',
    'NOTER ET RETOURNER',
    'SUITE A VOTRE DEMANDE']

  static   letter_types = [
    'Lettre',
    'BE',
    'Circulaire',
    'Facture',
    'Décision',
    'Arrêté',
    'LetBEtre',
    'Decret']

  static   in_types = [
    'Originale',
    'Copie',
    'Enveloppe',
    'Magazine',
    'Mensuel']



  toOracleDate(in_date) {
    let date = new Date(in_date)
    return `${date.getFullYear()}/${this.addZero(date.getMonth() + 1)}/${this.addZero(date.getDate())}`
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

}
