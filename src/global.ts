/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import {
  Application, Request, Response,
} from 'express';
import { AddressInfo } from 'net';

//= =======Module Initialisation===========
type TInitModulesReturn = (moduleName: string) => any[];

type TInitSubModules = {
  sub_modules: string[];
};
//= =======Module Initialisation===========

//= =======Module Initialisation===========
type TInitSubModuleReturn = (app: Application, preRoute: string) => void;
//= =======Module Initialisation===========

type THook = (request: Request, response: Response, next: any) => Promise<any>;

type TAction = (request: Request, response: Response) => Promise<Response>;

type TRouteArr = {
  path: string;
  hook: THook | unknown;
  method: string;
  action: TAction;
}[];

type TAddress = AddressInfo | string;

type TRoute = {
  path: string;
  hook?: THook | unknown;
  method: string;
  action: TAction;
};
// ====Request Call schema and response formats =====
type TResponseConfig = {
  url?: string;
  httpCode: string;
  type: string;
  [key: string]: number | any;
};
type TRequestMeta = { partner; method; domain; url; headers; eventType? };

type TRequestMessage = {
  date: Date,
  data: string,
  reqID?: string,
  request?: any,
  response?: any,
  responseType?: string,
  identifier?: string,
  pbarcode?: string,
  origin?: string
};

type TLogMessage = {
  date: Date,
  data: string,
  reqID?: string,
  sellerId?: string,
  identifier?: string,
  pbarcode?: string,
  origin?: string,
  reqDetails?: any
};

type TErrorMessage = {
  date: Date,
  data: string,
  reqID?: string,
  errorName?: string,
  statusCode?: number,
  partner?: string,
  identifier?: string,
  pbarcode?: string,
  origin?: string
};

export {
  TRoute,
  TRequestMeta,
  TInitModulesReturn,
  TInitSubModuleReturn,
  TRouteArr,
  TInitSubModules,
  TAddress,
  TResponseConfig,
  TErrorMessage,
  TLogMessage,
  TRequestMessage,
};
