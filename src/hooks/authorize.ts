/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';
import * as httpContext from 'express-http-context';
import * as config from 'config';
import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import CustomErrors from '../utils/response/CustomErrors';
import {
  logger, CustomError, ErrorTypes, HttpStatus, StatusCode,
} from '../utils/require';
import redis from '../utils/connections/redis_connection';
import { Merchant } from '../modules/common/models/mongo';

/**
 * Will set httpContext with statspath variable, to be used by StatsD
 * @param routePath matched path from route configurations
 */
function setStatsPath(routePath: string) {
  const env = process.env.NODE_ENV || 'development';
  const statsPath = `${String(config.get('app.name'))}.${env}${routePath.replace(/\/:/g, '.').replace(/\//g, '.')}`;
  httpContext.set('statsPath', statsPath);
}

/**
 * To log starting of the request with all details
 * @param request
 */
const setCommonParameters = (request) => {
  httpContext.set('reqId', uuidv4());
  httpContext.set('reqDetails', {
    originalUrl: request.originalUrl, params: request.params, method: request.method, headers: { ...request.headers, access_token: null },
  });
  httpContext.set('reqStartTime', process.hrtime()); // will be used for statsD
};

/**
 * To handle refresh token and generate token
 */
export const tokenAuthorize = () => (request: Request, response: Response, next: NextFunction) => {
  setStatsPath(request.route.path as string);
  setCommonParameters(request);
  return next();
};

export const setContext = (identifier: string) => {
  httpContext.set('identifier', identifier);
  httpContext.set('reqStartTime', process.hrtime()); // will be used for statsD
};

// eslint-disable-next-line import/prefer-default-export

export const authorize = (identifier: string) => (request: Request, response: Response, next: NextFunction) => {
  try {
    setStatsPath(request.route.path as string);
    setCommonParameters(request);
    setContext(identifier);
  } catch (error) {
    if (error instanceof CustomError) return CustomErrors.handleError(response, error);
  }
  return next();
};

export const authorizeTokenExpiry = (identifier: string) => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    setStatsPath(request.route.path as string);
    setCommonParameters(request);

    const authToken = request.headers.access_token ? request.headers
      .access_token.toString() : request.headers.access_token;

    if (!authToken) {
      throw new CustomError(ErrorTypes.AUTH_ERROR, HttpStatus.ERROR_400, StatusCode.ERROR_400, 'access_token not provided');
    }
    const decoded = await jwt.verify(authToken, config.get('jsonwebtoken.access_token_salt'));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let merchantResponse: null | any = {};
    if (!await redis.isExist(authToken)) {
      logger.info('Authenticating from DB');
      merchantResponse = await Merchant.findOne(
        {
          merchant_id: decoded.merchant_id,
          access_token: authToken,
        },
      );
      if (merchantResponse) { await redis.setter(authToken, JSON.stringify(merchantResponse)); }
    } else {
      logger.info('Authenticating from CACHE');
      merchantResponse = await redis.getter(authToken);
    }

    if (!merchantResponse) {
      throw new CustomError(ErrorTypes.AUTH_ERROR, HttpStatus.ERROR_401, StatusCode.ERROR_401, 'access_token is invalid');
    }
    httpContext.set('identifier', identifier);
    httpContext.set('seller_id', request.headers.seller_id ? request.headers.seller_id.toString() : null);
  } catch (error) {
    logger.error(error);
    return CustomErrors.handleError(response, new CustomError(ErrorTypes.AUTH_ERROR, HttpStatus.ERROR_400, StatusCode.ERROR_400, 'access_token is invalid'));
  }
  return next();
};
