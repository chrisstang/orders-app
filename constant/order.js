// Act as a temporary server database

export class GlobalRef {
    constructor(uniqueName) {
      this.sym = Symbol.for(uniqueName)
    }
  
    get data() {
      return global[this.sym]
    }
  
    set data(value) {
      global[this.sym] = value;
    }
}

const databaseConn = new GlobalRef('database');
if (!databaseConn.data) {
  databaseConn.data = []
}

export const data = databaseConn.data;