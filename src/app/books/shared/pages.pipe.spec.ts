import { PagesPipe } from './pages.pipe';

describe('PagesPipe', () => {
  let pipe: PagesPipe;
  it('create an instance', () => {
    pipe = new PagesPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return a "S.: 333"', () => {
    pipe = new PagesPipe();
    expect(pipe.transform(333)).toBe('S.: 333');
  });
});
