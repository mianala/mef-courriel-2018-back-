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
      toolbarButtons: [
        'undo', 'redo', '|', 'bold', 'italic',
        'underline', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html'],
      toolbarButtonsXS: ['undo', 'redo', '-', 'bold', 'italic', 'underline']
    }
  }

}
