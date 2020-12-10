import { DBConfig } from "ngx-indexed-db";

export const DB_CONFIG: DBConfig = {
  name: "TimelyDataDemo",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "email", keypath: "email", options: { unique: true } },
        { name: "birthYear", keypath: "birthYear", options: { unique: false } }
      ]
    }
  ]
};
