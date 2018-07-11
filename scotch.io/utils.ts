import * as del from 'del';
import { Collection } from 'lokijs';

const loadCollection = function(colname, db: Loki): Promise<Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colname) || db.addCollection(colname);
            resolve(_collection);
        });
    });
}

export { loadCollection }