import { MovieType } from './MovieType';

export class Movie implements Movie {
  constructor(private readonly movieType: MovieType) {}
  kindOf(): MovieType {
    return this.movieType;
  }
}