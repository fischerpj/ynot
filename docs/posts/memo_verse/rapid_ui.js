// =============================================================================
// here NEW mini_storage

class miniStorage {
    #version;
    #defaultKeyId;
    #initValue;
    #cachedValue;

    constructor(defaultKeyId = 'refidArray', 
                initValue    = "gen1:1") {
        this.#version       = '0.0.10'; 
        this.#defaultKeyId  = defaultKeyId;
        this.#initValue     = this.timestamp_(initValue);
        // check if exists
        if (!localStorage.getItem(this.#defaultKeyId)) {
        // Create storage with initValue
          this.#cachedValue = [this.#initValue];
          this.write_storage();
        }
        this.read_cache();
    }
    
     getLast() {
        return this.#cachedValue.slice(-1);
    }
  
    getRandom() {
      const array = this.#cachedValue;
      const randomIndex = Math.floor(Math.random() * array.length);
      return array.slice(randomIndex, randomIndex + 1);
    }

    getReverse() {
      const array = this.#cachedValue;
      return array.slice().reverse();
    }
    
    // add an element to Array
    addElement(refid) {
      const new_array = this.#cachedValue;
      const item = this.timestamp_(refid);
      new_array.push(item);
      this.#cachedValue = new_array;
      this.write_storage();
    }
    
    // add a timestamp to an existing object
    timestamp_(obj = this.initValue) {
      const timestamp = new Date().toISOString();
      return {refid: obj, ts: timestamp}
    }
    
    // write-through storage via cache
    write_storage() {
        this.keepUniqueRefid();
        this.#setItem(this.#defaultKeyId, this.#cachedValue );
    }
    
    // read-through cache from storage with LOGIC of unique refids
    read_cache() {
        this.#cachedValue = this.#getItem(this.#defaultKeyId);
        this.keepUniqueRefid();
    }
    
    // Getter for cachedValue
    get cache() {
        return this.#cachedValue;
    }  
    
    // Setter for cachedValue
    set cache(value) {
       this.#cachedValue = value;
    }  
    
    // Method to keep elements with unique refid in the cache
    keepUniqueRefid() {
      const refidSet = new Set();
      const uniqueArray = [];

      this.#cachedValue.forEach(element => {
        if (!refidSet.has(element.refid) && element.refid !== "") {
          refidSet.add(element.refid);
          uniqueArray.push(element);
        }
      });

      this.#cachedValue = uniqueArray;
    }
    
    // Method to retrieve UNIQUE refids
    getUniqueRefids() {
    const refidSet = new Set();
    
    this.#cachedValue.forEach(element => {
      refidSet.add(element.refid);
    });
    
    return Array.from(refidSet);
    }
    
    // get RAW storage
    #getItem(key = this.#defaultKeyId) {
        return JSON.parse(localStorage.getItem(key));
    }
    
    // set RAW storage
    #setItem(key = this.#defaultKeyId, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    // Getter for initValue
    get initValue() {
        return this.#initValue;
    } 
 
} // end of class miniStorage

// USE CASES
const mymini = new miniStorage();
//console.log(JSON.stringify(mymini.cache));
mymini.addElement("eph2:9");
//console.log(JSON.stringify(mymini.cache));
mymini.addElement("mark7:21");
mymini.addElement("matt6:33");
console.log(mymini.cache);
console.log(mymini.getRandom());
console.log(mymini.getLast());
console.log(mymini.getUniqueRefids());
console.log(mymini.getReverse());

// =============================================================================

class MUI {
  constructor(stor = new miniStorage()) {
//    this.container = document.body;
    this.container =  document.getElementById('mainAnchor') 

    this.createMainDiv();
    this.addInputAndButtons();
    this.addEventListeners();
    
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this.storageArray = stor;
  }

  createMainDiv() {
    // Check if mainDiv already exists
    if (!document.getElementById('mainDiv')) {
      this.mainDiv = document.createElement('div');
      this.mainDiv.id = 'mainDiv';

      this.inputDiv = document.createElement('div');
      this.inputDiv.id = 'inputDiv';

      this.outputDiv = document.createElement('div');
      this.outputDiv.id = 'outputDiv';
      
      this.ul = document.createElement('ul');
      this.ul.id = "resultList";
      this.outputDiv.appendChild(this.ul);

      this.mainDiv.appendChild(this.inputDiv);
      this.mainDiv.appendChild(this.outputDiv);

      this.container.appendChild(this.mainDiv);
    }
  }

  addInputAndButtons() {
    this.inputField = document.createElement('input');
    this.inputField.type = 'text';
    this.inputField.placeholder = 'Enter text here';
    this.inputField.class="form-control-plaintext"
    this.inputField.style.width = '120px'; // Adjust the width as needed

    this.viewButton = document.createElement('button');
    this.viewButton.textContent = 'View';
    this.viewButton.class = "btn btn-primary";

    this.randomButton = document.createElement('button');
    this.randomButton.textContent = 'Random';

    this.allButton = document.createElement('button');
    this.allButton.innerHTML = '&nbsp;&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;';

    this.refButton = document.createElement('button');
    this.refButton.textContent = 'Refs';
    
    this.inputDiv.appendChild(this.inputField);
    this.inputDiv.appendChild(this.viewButton);
    this.inputDiv.appendChild(this.randomButton);
    this.inputDiv.appendChild(this.allButton);
    this.inputDiv.appendChild(this.refButton);
  }

  addEventListeners() {
    this.viewButton.addEventListener('click', () => this.viewInput());
    this.randomButton.addEventListener('click', () => this.viewRandom());
    this.allButton.addEventListener('click', () => this.viewAll());
    this.refButton.addEventListener('click', () => this.refOnly());
  }

  async viewInput() {
    
 //   console.log(this.storageArray.getLast().toString());
//    this.storageArray.addElement("rev4:22");
    
    const inputValue = this.inputField.value;
    
    switch(inputValue) {
      case null :
        console.log( "NULL input does nothing");
        break;
      default:
        console.log( "added NOT null input");
        this.storageArray.addElement(inputValue);
        const result = await this.augmentAndPopulateArray(this.storageArray.getLast());
        console.log(this.storageArray.getLast().toString());
    } 
    
//    const refidArray = JSON.parse(localStorage.getItem('refidArray')) || [];
//    const timestamp = new Date().toISOString();
    // Empty the input field after updating outputDiv
    this.inputField.value = null;
  }

  async viewRandom() {
  //  
    const result = await this.augmentAndPopulateArray(this.storageArray.getRandom());
  }

  async viewAll() {
//     const result = await this.augmentAndPopulateArray_progressive();
     const result = await this.augmentAndPopulateArray( this.storageArray.getReverse());
  }
  
    async refOnly() {
     const result = JSON.stringify(this.storageArray.getUniqueRefids());
     this.ul = document.getElementById('resultList');  
     const li = document.createElement('li');
     li.innerHTML = result;
     this.ul.innerHTML = null;
     this.ul.appendChild(li);
     console.log(result);
  }
  
   // Method to retrieve unique refids
  XgetUniqueRefids() {
    const refidSet = new Set();

    this.storageArray.forEach(element => {
      refidSet.add(element.refid);
    });

    return Array.from(refidSet);
  }
  
  // Method to get the full URL with ?param=$ref
  getFullUrl(ref) {
        const url = `${this.urlbase}?param=${ref}`;
        console.log('Generated URL:', url);
        return url;
    }
    
  // Method to fetch the URL and merge its data result with item
  async fetchAndMerge() {
    try {
      const response = await fetch(this.turnRefIntoUrl());
      const fetchedData = await response.json();
      return { ...this.item, ...fetchedData };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }  
  
    displayLiHtml(li, responseObject) {
//      li.innerHTML = `Refid: ${responseObject.refid} <br> Content: ${responseObject.content} <br> Timestamp: ${responseObject.ts}`;
      let content_result = responseObject.content.replace(/^\d+/, '');
      li.innerHTML = `<p><b>${responseObject.refid}</b> ${content_result}`;
    }
  
  async augmentAndPopulateArray(arr = this.storageArray.getRandom()) {
  //          const arr = this.storageArray.cache;
            const ul = document.getElementById('resultList');
            const liElements = [];                                  // li array
 
/*          UNNECCESSARY first  
            // Create LI elements and keep references in an array
            arr.forEach(obj => {
              const li = document.createElement('li');
              li.textContent = 'Loading...'; // Initial placeholder text
// want to deferr this to gain execution time
              ul.appendChild(li);
// but li element is created 
              liElements.push(li);
            });
*/

            // Fetch data in parallel and update LI elements as promises resolve
            const fetchPromises = arr.map(async (obj, index) => {
              // Generate URL from refid property
              const url = this.getFullUrl(obj.refid);
              try {
                const response = await fetch(url);
                const data = await response.json(); // Assuming the response is in JSON format
                const xtd_response =  { ...obj, ...data };
                
                // Augment the object with the fetched data
//                obj.xtd_response = xtd_response;
                
               // Create and return a LI element for this object
                const li = document.createElement('li');
                  this.displayLiHtml(li, xtd_response) 
                return li;
                
              } catch (error) {
                console.error(`Failed to fetch data from ${url}:`, error);
                liElements[index].textContent = `Error loading ${url}`;
              }
            });
            
            // Wait for all fetch promises to complete
///            await Promise.all(fetchPromises);
            // Wait for all fetch promises to complete and get the updated LI elements
            const updatedLiElements = await Promise.all(fetchPromises);
            
            // Clear the existing UL content
            ul.innerHTML = '';
            // Append all the updated LI elements to the UL in one step
            updatedLiElements.forEach(li => ul.appendChild(li));
          }

  async augmentAndPopulateArray_progressive() {
            const arr = this.storageArray;
            const ul = document.getElementById('resultList');
            const liElements = [];                                  // li array
 
            // Create LI elements and keep references in an array
            arr.forEach(obj => {
              const li = document.createElement('li');
              li.textContent = 'Loading...' + obj.refid; // Initial placeholder text
              ul.appendChild(li);
              liElements.push(li);
            });

            // Fetch data in parallel and update LI elements as promises resolve
            const fetchPromises = arr.map(async (obj, index) => {
              // Generate URL from refid property
              const url = this.getFullUrl(obj.refid);
              try {
                const response = await fetch(url);
                const data = await response.json(); // Assuming the response is in JSON format
                console.log(data);
                const xtd_response =  { ...obj, ...data };
                
                // Augment the object with the fetched data
                obj.xtd_response = xtd_response;
                
                // Update the corresponding LI element
//                liElements[index].textContent = JSON.stringify(xtd_response); 
                this.displayLiHtml(liElements[index], xtd_response) 
                
              } catch (error) {
                console.error(`Failed to fetch data from ${url}:`, error);
                liElements[index].textContent = `Error loading ${url}`;
              }
              return obj.xtd_response;
            });
            
      // Wait for all fetch promises to complete
      const updatedLiElements = await Promise.all(fetchPromises);
      // Log the result of Promise.all
      console.log(updatedLiElements);
 
/*      
      // Clear the existing UL content
      ul.innerHTML = '';

      // Append all the updated LI elements to the UL in one step
      updatedLiElements.forEach(li => ul.appendChild(li));
      }
*/
}
} /// end of class MUI

// Retrieve array from localStorage and parse it
//const myArray = JSON.parse(localStorage.getItem('refidArray')) || [];
//console.log(myArray);

// Usage example:
document.addEventListener('DOMContentLoaded', () => {
  const muiInstance = new MUI(mymini);
  console.log(muiInstance);
});