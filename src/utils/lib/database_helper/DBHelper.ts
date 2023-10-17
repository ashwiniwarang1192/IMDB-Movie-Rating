/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import DBError from '../errorHandler/DBError';

export default class DBHelper {
  public static async find(collection: any, queryParams = {}, project = {}) {
    try {
      const results = await collection.find(queryParams, project).lean();
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }

  public static async findOne(collection: any, queryParams = {}, project = {}) {
    try {
      const results = await collection.findOne(queryParams, project).lean();
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }

  public static async create(collection: any, valueToInsert) {
    try {
      const results = await collection.create(valueToInsert);
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }

  public static async updateOne(collection: any, queryParams, valueToUpdate, arrayFilters = {}) {
    try {
      const results = await collection.updateOne(queryParams, valueToUpdate, arrayFilters);
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }

  public static async findOneAndUpdate(collection: any, queryParams, valueToUpdate) {
    try {
      const results = await collection.findOneAndUpdate(queryParams, valueToUpdate, { new: true });
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }

  public static async deleteOne(collection: any, queryParams = {}) {
    try {
      const results = await collection.deleteOne(queryParams).lean();
      return results;
    } catch (err) {
      if (err instanceof DBError) throw err;
      throw new DBError();
    }
  }
}
