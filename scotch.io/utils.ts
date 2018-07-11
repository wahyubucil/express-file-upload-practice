import * as del from 'del';
import { Collection } from 'lokijs';

const imageFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const loadCollection = function(colname, db: Loki): Promise<Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colname) || db.addCollection(colname);
            resolve(_collection);
        });
    });
};

export { imageFilter, loadCollection }