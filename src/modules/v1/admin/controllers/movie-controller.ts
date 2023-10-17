import { NextFunction, Request, Response } from 'express';
import MovieService from '../services/MovieService';
import { formattedApiResponse } from '../../../common/services/helper';
import * as httpContext from 'express-http-context';

export async function addMovie(request: Request, response: Response, next: NextFunction) {
  try {
    httpContext.set('identifier', 'createMovie')
    const apiResponse = await MovieService.addMovie(request?.body);
    return formattedApiResponse(response, apiResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updateMovie(request: Request, response: Response, next: NextFunction) {
  try {
    httpContext.set('identifier', 'updateMovie')
    const apiResponse = await MovieService.updateMovie(request);
    return formattedApiResponse(response, apiResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteMovie(request: Request, response: Response, next: NextFunction) {
  try {
    httpContext.set('identifier', 'deleteMovie')
    const apiResponse = await MovieService.deleteMovie(request?.query);
    return formattedApiResponse(response, apiResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getMovie(request: Request, response: Response, next: NextFunction) {
  try {
    httpContext.set('identifier', 'getMovie')
    const apiResponse = await MovieService.getMovie(request?.query);
    return formattedApiResponse(response, apiResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function addGenre(request: Request, response: Response, next: NextFunction) {
  try {
    httpContext.set('identifier', 'addGenre')
    const apiResponse = await MovieService.addGenre(request?.body);
    return formattedApiResponse(response, apiResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
}