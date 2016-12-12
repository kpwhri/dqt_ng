import { DqtPage } from './app.po';

describe('dqt App', function() {
  let page: DqtPage;

  beforeEach(() => {
    page = new DqtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
