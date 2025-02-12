// function hash(key) {
//   return Array.from(key).reduce((accum, char) => accum + char.charCodeAt(), 0);
// }
function hash(key, arrayLen) {
  const H_PRIME = 37;
  let numKey = Array.from(key).reduce(
    (accum, char) => accum * H_PRIME + char.charCodeAt(),
    0
  );
  return numKey % arrayLen;
}

// class HashMap {
//   constructor() {
//     this._items = [];
//   }
//   set(k, v) {
//     const hashedKey = hash(k);
//     this._items[hashedKey] = v;
//   }
//   get(k) {
//     let kv = this._items.find((kv) => k === kv[0]);
//     return kv ? kv[1] : undefined;
//   }
//   has(k) {
//     return this._items.find((kv) => k === kv[0]) !== undefined;
//   }
//   delete(k) {
//     let i = this._items.findIndex((kv) => k === kv[0]);
//     if (i !== -1) this._items.splice(i, 1);
//   }

//   keys() {
//     return this._items.map((kv) => kv[0]);
//   }
//   values() {
//     return this._items.map((kv) => kv[1]);
//   }
//   entries() {
//     return this._items;
//   }
// }

class HashMap {
  consturctor() {
    this._items = [];
  }
  set(k, v) {
    const hashedKey = hash(k, 10);
    this._items[hashedKey] = v;
  }
  get(k) {
    const hashedKey = hash(k, 10);
    return this._items[hashedKey];
  }
}
//
