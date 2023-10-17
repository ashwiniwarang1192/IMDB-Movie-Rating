/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
import {
  CustomError, StatusCode, ErrorTypes, HttpStatus
} from '../../../../utils/require';
import { successResponse } from '../../../common/services/helper'
import { Movies, Genre } from '../../../common/models/mongo'
import { santizeBody } from '../../../common/services/helper'
import { MovieType, GenreType } from '../config/DataTypes'
import MovieValidator  from './MovieValidator'
import MovieHelper from './MovieHelper'
import { WordleResponse, WordleErrorMsg } from '../../../../utils/response';
import { ValidationError } from '../../../../utils/lib/errorHandler';
import { isEmpty } from 'lodash';
const ObjectId = require('mongoose').Types.ObjectId;

class MovieService {
  /**
   * Will insert movies in db
   */

  
  public static async addMovie(requestBody: MovieType): Promise<any> {
    for (const key in requestBody) {
      requestBody[key] = (typeof requestBody[key] === 'string') ? santizeBody(requestBody[key]) : requestBody[key];
    }
    //if(!await MovieValidator.isRequestValid(requestBody)) throw new ValidationError(WordleErrorMsg.INVALID_INPUT); 
    let insertedMovie = await Movies.create(requestBody)
    const insertedMovieId = insertedMovie?._id;
    return WordleResponse.send(StatusCode.SUCCESS_1001, { createdOn: insertedMovie.createdAt, id: insertedMovieId });
  }

  /**
   * Will update the movies in db
   */

  public static async updateMovie(request): Promise<any> {
    for (const key in request.body) {
      request.body[key] = (typeof request.body[key] === 'string') ? santizeBody(request.body[key]) : request.body[key];
    }
    const { movieId } = request?.params;
    if (!movieId) throw new ValidationError(WordleErrorMsg.EMPTY_POST_ID);
    MovieValidator.validateMovieId(movieId);

    const existingMovie: MovieType = await Movies.findOne({ _id:  movieId}) as MovieType;
    if (!existingMovie) throw new ValidationError(WordleErrorMsg.INVALID_POST_ID);

    const updatedMovie = await Movies.update({_id: movieId },{$set: request.body})
    if (!updatedMovie) throw new ValidationError(WordleErrorMsg.INVALID_POST_ID);

    return WordleResponse.send(StatusCode.SUCCESS_1001, { updatedOn: updatedMovie?.updatedAt, id: updatedMovie?._id });
  }

  /**
   * Will delete the movies from db
   */

  public static async deleteMovie(requestQuery: any): Promise<any> {
    if (isEmpty(requestQuery) || !requestQuery?.movieId) throw new ValidationError(WordleErrorMsg.NOT_ENOUGH_DATA);
    const query = { _id: ObjectId(requestQuery?.movieId)}
    let deleteMovie:any = await Movies.deleteOne(query)
    if(!deleteMovie || deleteMovie.deletedCount === 0) throw new ValidationError(WordleErrorMsg.INVALID_POST_ID)

    return WordleResponse.send(StatusCode.SUCCESS_1001);
  }
  
  /**
   * Will read the movies from db
   */

  public static async getMovie(requestQuery): Promise<any> {
    if (isEmpty(requestQuery)) throw new ValidationError(WordleErrorMsg.NOT_ENOUGH_DATA);
    const query = MovieHelper.formatQueryParams(requestQuery);
    MovieValidator.validateMovieId(requestQuery.movieId as string);
    let retrievedMovie: MovieType | null = await Movies.findOne(query);
    if (!retrievedMovie) throw new ValidationError(WordleErrorMsg.EMPTY_RESULTS);
    return WordleResponse.send(StatusCode.SUCCESS_1001, { data: MovieHelper.getResponseObject(retrievedMovie) });
  }

  public static async addGenre(requestBody: GenreType): Promise<any> {
    for (const key in requestBody) {
      requestBody[key] = (typeof requestBody[key] === 'string') ? santizeBody(requestBody[key]) : requestBody[key];
    }
    //if(!await MovieValidator.isRequestValid(requestBody)) throw new ValidationError(WordleErrorMsg.INVALID_INPUT); 
    let insertedGenre = await Genre.create(requestBody)
    const insertedMovieId = insertedGenre?._id;
    return WordleResponse.send(StatusCode.SUCCESS_1001, { createdOn: insertedGenre.createdAt, id: insertedMovieId });
  }
}

export default MovieService;

