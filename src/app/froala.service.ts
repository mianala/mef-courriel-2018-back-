import {Injectable} from '@angular/core';

@Injectable()
export class FroalaService {

  constructor() {
  }

  getOptions() {
    return {
      // toolbarButtons: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL'],
      placeholderText: 'Contenu',
      // entitiesLanguage: 'fr'
    }
  }

}
