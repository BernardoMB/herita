import * as mongoose from 'mongoose';

let DB_NAME;
if (process.env.NODE_ENV !== 'production') {
    DB_NAME = 'mongodb://localhost/pf-app';
} else {
    DB_NAME = process.env.MLAB;
}

export class Db {

    constructor() {
        (<any>mongoose).Promise = global.Promise;
    }

    public connect(): void {
        mongoose.connect(DB_NAME)
            .then(() => console.log(`Connected to db: ${DB_NAME}`))
            .catch(err => console.log(`Error connecting to db: ${err}`));
    }
}


