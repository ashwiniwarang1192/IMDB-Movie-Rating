/* eslint-disable import/no-import-module-exports */
import { NextFunction } from 'express';
import moduleConfig from './config/default';
import * as init from '../../utils/lib/module_initialiser/initModules';

const initModules: NextFunction = init.default.initVersion(moduleConfig.modules);

module.exports = {
  initModules,
};
