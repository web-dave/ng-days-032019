import { IBook, IPublisher } from './costum-types';

export class Book implements IBook {
  constructor(
    public title: string = '',
    public subtitle: string = '',
    public isbn: string = '',
    public abstract: string = '',
    public numPages = 0,
    public author: string = '',
    public publisher: IPublisher = {
      name: '',
      url: ''
    }
  ) {}
}
