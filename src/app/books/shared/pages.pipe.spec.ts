import { PagesPipe } from './pages.pipe';

describe('PagesPipe', () => {
  it('create an instance', () => {
    const pipe = new PagesPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return a "S.: 333"', () => {
    const pipe = new PagesPipe();
    expect(pipe.transform(333)).toBe('S.: 333');
  });
});
