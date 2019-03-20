export interface IBook {
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  numPages: number;
  author: string;
  publisher: IPublisher;
}

export interface IPublisher {
  name: string;
  url: string;
}
