class BibRef {
  constructor(ref = 'gen1:1-4') {
    this.ref = ref;
    this.urlbase = 'https://jsfapi.netlify.app/.netlify/functions/bgw';
    this._response_object = null; // Initialize the response property to null
  }

// =============================================================================
// about the REF

  // Getter for ref
  get reference() {
    return this.ref;
  }

  // Setter for ref
  set reference(newRef) {
    this.ref = newRef;
  }

  // Method to display the reference
  displayReference() {
    console.log(`The current reference is: ${this.ref}`);
  }

// =============================================================================
// about the FETCH of URL

  // Method to get the full URL with ?param=$ref
  getFullUrl() {
    return `${this.urlbase}?param=${this.ref}`;
  }s

  // Method to fetch the content of the full URL and store the response
  async fetchContent() {
    const url = this.getFullUrl();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this._response_object = await response.json(); // parse json into object
//      console.log("toto json"+ this._response_object);
      return this._response_object;
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }
  
// =============================================================================
// about the RESPONSE, PAYLOAD

  // Getter for response
  get response() {
    return this._response_object;
  }
  
  // Method to get the stored response (now using the getter)
  getResponse() {
    return this.response;
  }

 // Getter for response.content  property
  get content() {
    return this._response_object.content;
  }
  
// =============================================================================
// about the OUTPUT FORMATTING

    // Method to create a <p> element containing the response.content
  get contentHTML() {
    if (this._response_object &&this._response_object.content) {
      const pElement = document.createElement('p');
      pElement.innerHTML = this._response_object.content;
      return pElement;
    } else {
      console.error('No content available in the response');
      return null;
    }
  }

}

// Usage
const myBibRef = new BibRef();
//myBibRef.displayReference();  // Outputs: The current reference is: gen1:1
//console.log(myBibRef.urlbase);  // Outputs: https://jsfapi.netlify.app/.netlify/functions/bgw
console.log(myBibRef.getFullUrl());  // Outputs: https://jsfapi.netlify.app/.netlify/functions/bgw?param=gen1:1
    
myBibRef.fetchContent().then(() => {
   console.log(myBibRef.content)  // Outputs the fetched response using thhe getter
  console.log(myBibRef.contentHTML)// Outputs the fetched response using thhe getter

  const pElement = myBibRef.contentHTML;
  if (pElement) {
    document.body.appendChild(pElement);  // Appends the <p> element to the body if it's not null
  }
});