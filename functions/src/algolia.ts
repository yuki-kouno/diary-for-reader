import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch, { SearchIndex } from 'algoliasearch';

const config = functions.config();
const client = algoliasearch(config.algolia.app_id, config.algolia.secret_key);

export class Algolia {
  private maxContentLength = 500;

  private transformDate(data: any) {
    return Object.entries(data).reduce((obj, [key, value]) => {
      if (value instanceof admin.firestore.Timestamp) {
        obj[key] = value.toMillis();
      }
      return obj;
    }, data);
  }

  private addDistributedRecords(
    index: SearchIndex,
    data: any,
    isKey: string,
    largeConcentKey: string
  ) {
    const reg = new RegExp(`[\\s\\S]{1,${this.maxContentLength}}`, 'gm');
    const records = data[largeConcentKey]
      .match(reg)
      .map((largeData: any, i: number) => {
        return {
          ...data,
          objectID: data[isKey] + '-' + i,
          [largeConcentKey]: largeData,
        };
      });

    return Promise.all(records.map((record: any) => index.saveObject(record)));
  }

  async saveRecord(param: {
    indexName: string;
    data: any;
    isUpdate?: boolean;
    idKey?: string;
    largeConcentKey?: string;
  }) {
    const index = client.initIndex(param.indexName);
    const item = this.transformDate(param.data);
    const idKey = param.idKey || 'id';

    if (param.isUpdate) {
      await this.removeRecord(param.indexName, item[idKey]);
    }

    if (
      param.largeConcentKey &&
      item[param.largeConcentKey] &&
      item[param.largeConcentKey].length > this.maxContentLength
    ) {
      return this.addDistributedRecords(
        index,
        item,
        idKey,
        param.largeConcentKey
      );
    } else {
      item.objectID = item[idKey];
      return index.saveObject(item);
    }
  }

  removeRecord(indexName: string, id: string, idKey: string = 'id') {
    const index = client.initIndex(indexName);
    return index.deleteBy({ filters: `${idKey}:${id}` });
  }
}
