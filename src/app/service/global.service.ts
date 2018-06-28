import {Injectable} from '@angular/core';
import {EnvService} from './env.service';

@Injectable()
export class GlobalService {

  //if need to add add at the bottom of the list please
  static observations = [
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
    'SUITE A VOTRE DEMANDE'];

  static letter_types = [
    'Lettre',
    'BE',
    'Circulaire',
    'Facture',
    'Décision',
    'Arrêté',
    'Decret',
    'Magazine',
    'Mensuel'
  ];


  static in_types = [
    'Originale',
    'Copie',
    'Enveloppe'];

  static ship_types = [
    'Autre',
    'Pour signature',
    'Pour avis',
    'BE'
  ];

  static return_types = [
    'Autre',
    'Signé',
    'Avis favorable'
  ];


  static sortById(b, a) {
    const c = a['id'];
    const d = b['id'];
    return c - d;
  }

  static sortByEntity(b, a) {
    const c = a['id'];
    const d = b['id'];
    return c - d;
  }

  static sortByDate(b, a) {
    const c: any = new Date(a['date']);
    const d: any = new Date(b['date']);
    return c - d;
  }

  static updateArray(newArray, actualArray) {
    // if same return
    if (newArray == actualArray) {
      return newArray
    }

    // if don't contain the id push
    actualArray.forEach(item => {
      if (newArray.indexOf(item) == -1) {
        actualArray.splice(actualArray.indexOf(item), 1);
      }
    });

    // if don't contain the id push
    newArray.forEach(item => {
      if (actualArray.indexOf(item) == -1) {
        actualArray.push(item)
      }
    });

    // sort both
    // if don't match perfectly then update those who

    return actualArray;
  }

  static sameDay(d1, d2) {
    return d1.getFullYear() == d2.getFullYear() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getDate() == d2.getDate();
  }


  static toggleInArray(array, value) {
    const index = array.indexOf(value);

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  static openBe() {

    const be = {
      numero: 'Numero',
      header: 'MINISTERE <br> DES FINANCES ET DU BUDGET <br>     -------------   <br>     SECRET ARIAT GENERAL <br>     ------------- <br>     DIRECTION GENERALE DU BUDGET<br>     ------------- <br> Direction des Secteurs Productif et Infrastructure<br>     ------------- <br>Service Productif ',
      receiver: 'receiver_label',
      sender: 'sender',
      observation: 'observation',
      date: 'some formated date',
      ds: 'lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum',
      cs: '1, 2, 5, 3, 5'
    };

    const be_string = JSON.stringify(be);

    const win = window.open(EnvService.ip() + '/app/be?q=' + be_string, 'BE', 'status=0,title=0,height=800,width=1000,scrollbars=1');
    win.focus();
    win.print();

  }


  toOracleDate(in_date) {
    const date = new Date(in_date);
    return `${date.getFullYear()}/${this.addZero(date.getMonth() + 1)}/${this.addZero(date.getDate())}`
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  constructor() {
  }

  static paginator = {
    pageSize: 15,
    pageSizeOptions: [5, 15, 50]
  }

  static paginate(array, page_size, page_number) {
    console.log(array.slice(page_number * page_size, (page_number) * page_size))
    return array.slice(page_number * page_size, (page_number+1) * page_size);
  }
}
