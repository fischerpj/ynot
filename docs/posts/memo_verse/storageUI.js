// =============================================================================
// in storageKey.js
// StorageUI
//    has OutputDiv
//    has StorageKey 
//      extends StorageAPI
//      has StorageObject, basically an Array

// =============================================================================
class StorageAPI {
  #version;
  #keyId;

  constructor(keyId = 'myRefArray') {
    this.#version = '0.0.4'; // Initialize the version property to 0.0.3
    this.#keyId = keyId; // Initialize the keyId property

    // Check if localStorage is available
    if (!this.isLocalStorageAvailable()) {
      console.error('localStorage is not available in this browser.');
    } else {
      // Initialize the keyId with an empty array
      this.setItem(this.#keyId, []);
    }
  }

  // Method to check if localStorage is available
  isLocalStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Method to set an item in localStorage
  setItem(key, value) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('Unable to set item, localStorage not available.');
    }
  }

  // Method to get an item from localStorage
  getItem(key) {
    if (this.isLocalStorageAvailable()) {
      const value = localStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error('JSON parsing error:', e);
        return null;
      }
    } else {
      console.error('Unable to get item, localStorage not available.');
      return null;
    }
  }

  // Method to remove an item from localStorage
  removeItem(key) {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      console.error('Unable to remove item, localStorage not available.');
    }
  }

  // Method to clear all items from localStorage
  clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    } else {
      console.error('Unable to clear items, localStorage not available.');
    }
  }

  // Method to get all keys from localStorage
  getAllKeys() {
    if (this.isLocalStorageAvailable()) {
      return Object.keys(localStorage);
    } else {
      console.error('Unable to get keys, localStorage not available.');
      return [];
    }
  }

  // Method to get the version
  getVersion() {
    return this.#version;
  }

  // Method to get the keyId
  getKeyId() {
    return this.#keyId;
  }
}

// =============================================================================
class StorageObject {
  #accu;

  constructor(initialArray) {
    this.#accu = Array.isArray(initialArray) ? initialArray : ['gen1:1'];
  }

  // Getter for accu
  get accu() {
    return this.#accu;
  }

  // Setter for accu
  set accu(newArray) {
    if (Array.isArray(newArray) && newArray.length > 0) {
      this.#accu = newArray;
    } else {
      this.#accu = ['gen1:1'];
    }
  }

  // Method to accumulate a new value
  accumulateValue(additionalValue) {
    this.#accu.push(additionalValue);
  }

  // Method to clear the accumulated values and initialize with 'gen1:1'
  clearValues() {
    this.#accu = ['gen1:1'];
  }

  // Method to select a random element from the array
  random() {
    const randomIndex = Math.floor(Math.random() * this.#accu.length);
    return this.#accu[randomIndex];
  }

  // Method to get the last element of the array
  getLastElement() {
    return this.#accu[this.#accu.length - 1];
  }
  
}

// =============================================================================
class StorageKey extends StorageAPI {
  constructor(keyId = 'myRefArray', refArray = new StorageObject(['gen1:1'])) {
    super(keyId); // Call parent constructor with keyId

    // Check if localStorage is available
    if (this.isLocalStorageAvailable()) {
      // Initialize the keyId with an initial value of refArray
      this.setItem(keyId, refArray.accu);
    }
  }

  // Method to add an element to the refArray
  addElement(element) {
    const refArray = this.getItem(this.getKeyId()) || [];
    refArray.push(element);
    this.setItem(this.getKeyId(), refArray);
  }

  // Method to get the refArray
  getRefArray() {
    return this.getItem(this.getKeyId());
  }

  // Method to get a random element from the refArray
  getRandomElement() {
    const refArray = this.getRefArray();
    const randomIndex = Math.floor(Math.random() * refArray.length);
    return refArray[randomIndex];
  }

  // Method to get the last element of the refArray
  getLastElement() {
    const refArray = this.getRefArray();
    return refArray[refArray.length - 1];
  }
}

// =============================================================================
class StorageUI {
  constructor(storageKey) {
    this.storageKey = storageKey;

    // Create a div element to display the last element of the array
    this.outputDiv = document.createElement('div');
    this.outputDiv.id = 'storageUIOutput';
    document.body.appendChild(this.outputDiv);

    // Display the last element of the array
    this.displayLastElement();
  }

  // Method to display the last element of the array
  displayLastElement() {
    const lastElement = this.storageKey.getLastElement();
    this.outputDiv.textContent = `Last Element: ${lastElement}`;
  }
}

// Example usage of the StorageKey class
const storageKey = new StorageKey();
console.log(storageKey.getVersion()); // Outputs: 0.0.3
console.log(storageKey.getKeyId()); // Outputs: myRefArray
storageKey.addElement('eph2:8');
storageKey.addElement('gal2:21');
storageKey.addElement('rom1:17');
storageKey.addElement('heb11:6');
const refArray = storageKey.getRefArray();
console.log(refArray);  // Outputs: ['gen1:1', 'exampleElement']
console.log(storageKey.getRandomElement()); // Outputs a random element from the refArray
console.log(storageKey.getLastElement()); // Outputs the last element of the refArray

// Example usage of the StorageUI class 
//const storageKey = new StorageKey(); 
const storageUI = new StorageUI(storageKey); 
console.log(storageUI.outputDiv.textContent);
