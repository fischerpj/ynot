// miniKV minimalistic KV Storage

// write KV class to get and set keyèValu in localStorage

class kv {
    #defaultKeyId;
    #cachedValue;
    #initValue;

    constructor(defaultKeyId = 'myRefArray', 
                initValue = 'gen1:1') {
        this.#defaultKeyId = defaultKeyId;
        this.#initValue = initValue;
        // Check if the item identified by defaultKeyId is not present
        if (!localStorage.getItem(this.#defaultKeyId)) {
            // Create it with initValue
            this.setItem(this.#defaultKeyId, JSON.stringify(this.#initValue));
        }
        // Initialize cachedValue with the storage item
        this.#cachedValue = JSON.parse(localStorage.getItem(this.#defaultKeyId));
    }

    // Getter for defaultKeyId
    get defaultKeyId() {
        return this.#defaultKeyId;
    }

    // Getter for initValue
    get initValue() {
        return this.#initValue;
    }

    // Getter for cachedValue IS DYNAMIC
    getCachedValue() {
        return this.#cachedValue;
    }

    // Setter for cachedValue IS DYNAMIC
    set cachedValue(newValue) {
        this.#cachedValue = Array.isArray(newValue) ? newValue : Array.of(newValue);
        this.updateStorage();
    }
    
    // Method to update storage from cachedValue IS TRIGGERED by cache
    updateStorage() {
        if (this.#cachedValue !== null) {
            localStorage.setItem(this.#defaultKeyId, JSON.stringify(this.#cachedValue));
        }
    }

/*
    // Setter for defaultKeyId
    set defaultKeyId(newKeyId) {
        this.#defaultKeyId = newKeyId;
        // Update cachedValue with the new key
        this.refreshCache();
    }
*/ 

    setItem(key = this.#defaultKeyId, value) {
        localStorage.setItem(key, JSON.stringify(value));
        this.refreshCache();
    }

    getItem(key = this.#defaultKeyId) {
        return JSON.parse(localStorage.getItem(key));
    }

    // Method to get all keys from localStorage
    getAllKeys() {
        return Object.keys(localStorage);
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }

    // Method to clear all items in localStorage
    clear() {
        localStorage.clear();
    }

    // Method to update the cachedValue from storage
    refreshCache() {
        this.#cachedValue = JSON.parse(localStorage.getItem(this.#defaultKeyId));
    }
    
  // Method to accumulate a value to the cached array
    accumulateToCache(value) {
        // Convert cachedValue to array if it's not already
        let cachedArray = Array.isArray(this.#cachedValue) ? this.#cachedValue : Array.of(this.#cachedValue);
        // Push the new value to the array
        cachedArray.push(value);
        // Update the cachedValue and storage
        this.#cachedValue = cachedArray;
        this.updateStorage();
    }
}

// Create an instance of kv
const storage = new kv();
storage.accumulateToCache('ex2:1');

// Access the defaultKeyId
console.log(storage.defaultKeyId);  // Output: 'newDefaultKey'

// Set a new cachedValue and propagate to storage
console.log(storage.getCachedValue());

// Check the updated value in localStorage
console.log(storage.getItem());  // Output: 'newCachedValue'


/*
class kv {
    #defaultKeyId;
    #cachedValue;
    #initValue;

    constructor(defaultKeyId = 'myRefArray', initValue = 'gen1:1') {
        this.#defaultKeyId = defaultKeyId;
        this.#initValue = initValue;
        // Check if the item identified by defaultKeyId is not present
        if (!localStorage.getItem(this.#defaultKeyId)) {
            // Create it with initValue
            this.setItem(this.#defaultKeyId, this.#initValue);
        }
        // Initialize cachedValue with the storage item
        this.#cachedValue = localStorage.getItem(this.#defaultKeyId);
    }

    // Getter for defaultKeyId
    get defaultKeyId() {
        return this.#defaultKeyId;
    }

    // Setter for defaultKeyId
    set defaultKeyId(newKeyId) {
        this.#defaultKeyId = newKeyId;
        // Update cachedValue with the new key
        this.refreshCache();
    }

    // Getter for cachedValue
    get cachedValue() {
        return this.#cachedValue;
    }

    // Setter for cachedValue
    set cachedValue(newValue) {
        this.#cachedValue = newValue;
        this.updateStorage();
    }

    // Getter for initValue
    get initValue() {
        return this.#initValue;
    }

    setItem(key = this.#defaultKeyId, value) {
        localStorage.setItem(key, value);
    }

    getItem(key = this.#defaultKeyId) {
        return localStorage.getItem(key);
    }

    removeItem(key) {
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

    // Method to update the cachedValue from storage
    refreshCache() {
        this.#cachedValue = localStorage.getItem(this.#defaultKeyId);
    }

    // Method to update storage from cachedValue
    updateStorage() {
        if (this.#cachedValue !== null) {
            localStorage.setItem(this.#defaultKeyId, this.#cachedValue);
        }
    }

    // Method to return cachedValue as an array
    asArray() {
        return Array.of(this.#cachedValue);
    }

    // Method to accumulate a value to the cached array
    accumulateToCache(value) {
        // Convert cachedValue to array if it's not already
        let cachedArray = Array.isArray(this.#cachedValue) ? this.#cachedValue : [this.#cachedValue];
        // Push the new value to the array
        cachedArray.push(value);
        // Update the cachedValue and storage
        this.#cachedValue = cachedArray;
        this.updateStorage();
    }
}

*/