import { DataSource } from 'typeorm';

export class Database {
    private dbDataSource: DataSource;

    constructor(dbDataSource: DataSource) {
        this.dbDataSource = dbDataSource;
    }

    public initialize(): Promise<DataSource> {
        if (!this.dbDataSource.isInitialized) {
            return new Promise((resolve, reject) => {
                return this.dbDataSource
                    .initialize()
                    .then((data: DataSource) => {
                        return resolve(data);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            });
        }
    }

    public getdbDataSource() {
        return this.dbDataSource;
    }
}

export default Database;
