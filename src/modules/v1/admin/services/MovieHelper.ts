import { MovieType } from './../config/MovieDataTypes'
export default class MovieHelper {
  public static formatQueryParams(queryParams) {
    if (queryParams?.movieId) {
      return { _id: queryParams.movieId};
    }
    return {};
  }

  public static getResponseObject(retrievedMovie: MovieType) : object {
    return {
      _id: retrievedMovie._id,
      '99popularity': retrievedMovie['99popularity'],
      director: retrievedMovie.director,
      imdb_score: retrievedMovie.imdb_score,
      genre: retrievedMovie.genre,
      name: retrievedMovie.name,
      createdBy: retrievedMovie.created_by,
      createdAt: retrievedMovie.createdAt,
      updatedAt: retrievedMovie.updatedAt,
    };
  }
}