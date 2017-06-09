import { BettingAppPage } from './app.po';

describe('betting-app App', () => {
  let page: BettingAppPage;

  beforeEach(() => {
    page = new BettingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
