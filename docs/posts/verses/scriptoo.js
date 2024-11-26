// StorageObject CLASS, setter & getter 
class StorageObject {
  #accu;
  #lastvalue;
  
  constructor(key, initialvalue, reset= false) {
    this.version = 0.4;
    this.key = key;
    this.#lastvalue = initialvalue; // Using _value to indicate it's a private property

    // create & initialize an array
    if (reset) {
      this.#accu = [];
    } else {
      // retrieve previous store
      this.#accu = JSON.parse(localStorage.getItem(this.key));
    }
    // accumulate the new value
    this.#accu.push(this.#lastvalue);

    // Save the accumulated object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this.#accu));
  }  
    
  // Getter for the value property
  get lastvalue() {
    return this.#lastvalue;
  }
  
  get accu() {
    return JSON.parse(localStorage.getItem(this.key));
  }
  
  set accu(newValue) {
    this.#lastvalue = newValue;
    this.#accu.push(newValue);
    // side-effect, Save the object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this.#accu));
  }
} // end of class

// Example usage:
const myStorage = new StorageObject('myKey', 'gen2:4', true);
console.log(myStorage.accu.toString());

myStorage.accu = 'rom1:23';
myStorage.accu = 'eph2:8';
console.log(myStorage.accu.toString());
