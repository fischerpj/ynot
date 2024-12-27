// .js

// STORAGEAPI in LocalStorage
//    a) creates a KV pair [defaultKey/initValue] and b) retrieves its Value

class StorageAPI {
    #defaultKeyId;
    #initValue;
    cacheObject;
  
    constructor(defaultKeyId = 'myRefArray', 
                initValue = 'gen1:1') {
        this.#defaultKeyId = defaultKeyId;
        this.#initValue = initValue;
        
        // Check if the item identified by defaultKeyId is not present
        // ELSE IF EXISTS LEAVE IT !!
        if (!localStorage.getItem(this.#defaultKeyId)) {
            // then Create it with initValue
            localStorage.setItem(this.#defaultKeyId, JSON.stringify(this.#initValue) );
        }
        // create / init CACHE locally to this
        this.cacheObject = this.getItem();
    }

    getDefaultKey() {
        return  this.#defaultKeyId;
    }
    
    getInitValue() {
        return  this.#initValue;
    }
    
    setItem(key = this.#defaultKeyId, value) {
        localStorage.setItem(key,  JSON.stringify(value));
    }

    getItem(key = this.#defaultKeyId) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeItem(key = this.#defaultKeyId) {
        localStorage.removeItem(key);
    }

    // Method to get all keys from localStorage
    getAllKeys() {
        return Object.keys(localStorage);
    }

    // Method to clear all items in localStorage
    clear() {
        localStorage.clear();
    }
}



// =============================================================================
//  USAGE

// USE CASES
// CREATE by default the key myRefArray with value gen1:2 
const storage = new StorageAPI(undefined, 'gen1:2');
//storage.setItem(undefined,  JSON.stringify(['ex2:1']));
console.log(storage.getInitValue());
// RETRIEVE the VALUE
console.log(storage.getDefaultKey() +" : " + storage.getItem());
console.log("cache : " + storage.cacheObject);


/*
// add explicitely an additional key in same storage space
storage.setItem(undefined,   JSON.stringify(['ex2:1']));
storage.removeItem("toto");

console.log(storage.getAllKeys());  // Output: []
console.log(storage.getItem("person"));  // Output: []
*/