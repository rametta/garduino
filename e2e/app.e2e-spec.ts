import { GarduinoPage } from './app.po';

describe('garduino App', () => {
  let page: GarduinoPage;

  beforeEach(() => {
    page = new GarduinoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
