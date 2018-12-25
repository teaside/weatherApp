import { PluralNamePipe } from './plural-for-city.pipe';

describe('PluralNamePipe', () => {
  it('create an instance', () => {
    const pipe = new PluralNamePipe();
    expect(pipe).toBeTruthy();
  });
});
