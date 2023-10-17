import mongoose = require('mongoose');
import DBHelper from '../../../../utils/lib/database_helper/DBHelper';
import { ValidationError } from '../../../../utils/lib/errorHandler';
import { MovieType } from '../config/MovieDataTypes';
import { statusActive, statusInactive } from '../../../common/constants';
import WordleErrorMsg from '../../../../utils/response/WordleErrorMsg';

export default class PostRequestValidator {
  static isRequestValid(requestBody: MovieType): boolean {
    return (!!requestBody['99popularity'] && !!requestBody['imdb_score'] && !!requestBody['genre'] && !!requestBody['director'] && !!requestBody['created_by']);
  }

  static validateMovieId(movieId: string) {
    if (movieId && !mongoose.Types.ObjectId.isValid(movieId)) throw new ValidationError(WordleErrorMsg.INVALID_POST_ID);
  }
}