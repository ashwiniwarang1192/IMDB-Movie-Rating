/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import IORedis from 'ioredis';
import * as config from 'config';
import { logger } from '../require';

const connInfo: any = config.get('redis');

class Redis {
  private redis: any;

  private static instance: Redis;

  private enabled = true;

  public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  private constructor() {
    try {
      this.enabled = connInfo.enabled;
      if (this.enabled) this.redis = new IORedis(connInfo.sentinelConfig);
    } catch (err) {
      logger.error(err);
      if (err instanceof Error) logger.error(err);
    }
  }

  public setter(key: string, value: string, options: string[] = []) {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve('redis disabled');
      }
      if (!this.redis) return reject('redis instance is null');

      this.redis.set(key, value, options, (err, result) => {
        if (result) {
          logger.info(`catched ${key}`);
          resolve('added!');
        } else {
          reject(err);
        }
      });
      return true;
    });
  }

  public getter(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve(null);
      }
      if (!this.redis) return reject('redis instance is null');

      try {
        this.redis.get(key, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
      return true;
    });
  }

  public isExist(key: string): any {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve(false);
      }

      if (!this.redis) return reject('redis instance is null');

      try {
        this.redis.exists(key, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      } catch (err) {
        reject(err);
      }
      return true;
    });
  }

  /**
 * To set hash key
 * @param key
 * @param index
 * @param value
 */
  public hsetter(key: string, index: string, value: string) {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve('redis disabled');
      }

      if (!this.redis) return reject('redis instance is null');
      try {
        this.redis.hset(key, index, value, (err, result) => {
          logger.error(err);
          logger.log(result);

          if (result) {
            logger.info(`catched ${key} ${index}`);
            resolve('added!');
          } else {
            logger.error(err);

            reject(err);
          }
        });
      } catch (err) {
        logger.error(err);

        reject(err);
      }
      return true;
    });
  }

  /**
   * To get hash key's index
   * @param key
   * @param index
   */
  public hgetter(key: string, index: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve(null);
      }
      logger.log(`key====== ${key}`);
      logger.log(`index====== ${index}`);

      if (!this.redis) return reject('redis instance is null');

      try {
        this.redis.hget(key, index, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
      return true;
    });
  }

  /**
   * To check if hash key exists with given index
   * @param key
   * @param index
   */
  public hExist(key: string, index: string): any {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve(false);
      }

      if (!this.redis) return reject('redis instance is null');

      try {
        this.redis.hexists(key, index, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      } catch (err) {
        reject(err);
      }
      return true;
    });
  }

  public delete(key: string) {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return resolve('');
      }

      if (!this.redis) return reject('redis instance is null');

      try {
        this.redis.del(key, (err, result) => {
          if (err) {
            reject(err);
          } else {
            logger.info(`deleted ${key}`);
            resolve(result);
          }
        });
      } catch (err) {
        reject(err);
      }
      return true;
    });
  }
}

export default Redis.getInstance();