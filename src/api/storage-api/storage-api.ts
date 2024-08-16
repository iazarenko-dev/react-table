export class IndexedDBService<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static instance: IndexedDBService<any> | null = null;
    private dbName: string;
    private storeName: string;
    private dbVersion: number;

    private constructor(dbName: string, storeName: string, dbVersion: number = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.dbVersion = dbVersion;
    }

    public static getInstance<T>(dbName: string = 'sheet', storeName: string = 'table', dbVersion: number = 1): IndexedDBService<T> {
        if (!IndexedDBService.instance) {
            IndexedDBService.instance = new IndexedDBService<T>(dbName, storeName, dbVersion);
        }
        return IndexedDBService.instance;
    }

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    public async storeArray(array: T[], id: string = 'largeArray'): Promise<void> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const data = { id, array };

        store.put(data);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                resolve();
            };
            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }

    public async retrieveArray(id: string = 'largeArray'): Promise<T[] | undefined> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result?.array);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    public async deleteArray(id: string = 'largeArray'): Promise<void> {
        const db = await this.openDB();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.delete(id);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                resolve();
            };
            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }

    public async updateArrayElementByIndex(index: number, newValue: T, id: string = 'largeArray'): Promise<void> {
        const array = await this.retrieveArray(id);
        if (!array) {
            throw new Error(`Array with id ${id} not found`);
        }
        if (index < 0 || index >= array.length) {
            throw new Error(`Index ${index} is out of bounds`);
        }

        array[index] = newValue;

        await this.storeArray(array, id);
    }
}
