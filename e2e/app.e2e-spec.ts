import { NgcourrielPage } from './app.po';

describe('ngcourriel App', () => {
  let page: NgcourrielPage;

  beforeEach(() => {
    page = new NgcourrielPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
