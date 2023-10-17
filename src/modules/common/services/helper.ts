/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Response } from 'express';
import {
  HttpStatus,
  CustomError,
  ErrorTypes,
  StatusCode,
  ResponseStatus,
  Success,

} from '../../../utils/require';
const xss = require('xss');

function formattedApiResponse(responseObj : Response, apiResponse: { httpCode:number, response:object }) {
  const { httpCode, response } = apiResponse;
  return responseObj.status(httpCode).json(response);
}

function formattedApiResponses(responseObj : Response, apiResponse: { httpCode:number, response:object }) {
  const { httpCode, ...response } = apiResponse;
  return responseObj.status(httpCode).json(response);
}

function successResponse(responseData) {
  return {
    httpCode: HttpStatus.SUCCESS_200,
    ...new Success(StatusCode.SUCCESS_1001, ResponseStatus.SUCCESS,
      { statusType: ResponseStatus.SUCCESS, ...responseData }),
  };
}

function santizeBody(reqBody) {
  return (typeof reqBody === 'string') ? xss(reqBody) : reqBody;
}

const columnParamMapping = {
  name: {
    type: 'string',
    columnName: 'name',
  },
  director: {
    type: 'string',
    columnName: 'director',
  },
  '99popularity': {
    type: 'number',
    columnName: '99popularity'
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  formattedApiResponse,
  formattedApiResponses,
  santizeBody,
  successResponse,
  columnParamMapping
};
