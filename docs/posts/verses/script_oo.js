// StorageObject CLASS, setter & getter 
class StorageObject {
  constructor(key, value) {
    this.key = key;
    this._value = value; // Using _value to indicate it's a private property

    // create & initialize an array
    this._accu = [];
    this._accu.push(this._value);

    // Save the object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this._accu));
    
  // Getter for the value property
  get value() {
    this._value = JSON.parse(localStorage.getItem(this.key));
    return this._value;
  }

  // Setter for the value property
  set value(newValue) {
    this._value = newValue;
    this._accu.push(newObject);
    // side-effect, Save the object to localStorage
    localStorage.setItem(this.key, JSON.stringify(this._accu));
  }
}

// Example usage:
const myStorage = new StorageObject('myKey', 'initialValue');
console.log(myStorage.value); // Output: initialValue
myStorage.value = 'newValue';
console.log(myStorage.value); // Output: newValue
console.log(typeof(myStorage.key)); // Output: newValue
console.log(myStorage);