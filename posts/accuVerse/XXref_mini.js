// 1. Ref.js
// 2. BibliBooksCodes.js

//======================   Ref.Js
// Ref class and methods can be imported in quarto ojs

export class Ref {
  // takes an array of validated reference(s) as argument
  // Step 1: Define URLs-params as a property
  constructor(
    input = [ 'Hos14!SG21', 'Neh13!SG21','Rev22:4!KJV' ],
    edition_default="SG21") {
      this.inputs = Array.isArray(input) ? input : [input];
      this.baseUrl = 'https://hall.pjafischer.workers.dev/passage/';
      this.urls = this.inputs.map(input => `${this.baseUrl}?param=${encodeURIComponent(input)}`);
      this.data = [];
      this.outputDiv = document.getElementById('outputDiv');
      this.edition_default = edition_default;
    }

  // Step 2: Method to fetch and populate data
  async fetch_parallel() {
    // attempt to fetch the urls
    try {
      const responses = await Promise.all(
        this.urls.map(url => fetch(url).then(res => res.json()))
      );
      this.data = responses;
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }
  
   // Step 3: Display method that ensures data is ready
  displayData() {
    const outputDiv = document.getElementById('outputDiv');
    if (!outputDiv) {
      console.error('No element with id="outputdiv" found.');
      return;
    }

    // Clear previous content
    outputDiv.innerHTML = '';

    // Create UL
    const ul = document.createElement('ul');

    // Create LI for each data item
    this.data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item.ref + item.htmlraw; // or any other property
      ul.appendChild(li);
    });

    // Append UL to outputDiv
    outputDiv.appendChild(ul);
  } // end of Display
}

export class Bcve {

  input = null;
  ref_edition = ['', ''];
  bc_verse = ['', ''];

  constructor(
    input = 'Hos14!SG21',
    edition_default ="SG21"){
      this.input = input.toLowerCase();
      this.edition_default = edition_default;
      [this.ref_edition[0], this.ref_edition[1]] = this.input.split('!', 2).concat('');
      [this.bc_verse[0], this.bc_verse[1]] = this.ref_edition[0].split(':', 2).concat('');
      this.edition = this.edition_();      // spot valid edition first
      this.book = this.bc_verse[0].replace(/\d+$/,''); // strip trailing digits if present
      this.chap = this.bc_verse[0].match(/\d+$/) === null ? "" : this.bc_verse[0].match(/\d+$/)[0];
      this.verse = this.bc_verse[1];
      const BBC = new BibleBooksCodes(); 
      this.bbc = BBC.getBBBFromText(this.book);
//      this.abbr = BBC.getUSFMAbbreviation(this.bbc);
//      this.param = this.bbc + this.chap + ":" + this.verse + "!" + this.edition;
      this.param = this.param_() // this.verse === null ? "!".concat(this.edition) : ":".concat(this.verse).concat("!".concat(this.edition));
    }
    
   hi() { 
     console.log("toto");
   } 
   
   param_() {
     const res = this.bbc + this.chap + ":" + this.verse + "!" + this.edition;
     return res.replace(/:!/,"!")
   }
   
   edition_() {
    // grasp edition
    const upper = this.ref_edition[1].toUpperCase();
    switch (upper) {
      case "":
      case undefined :
      case null:
        return this.edition_default;
      case "KJV":
      case "SG21":
      case "NGU-DE":
      case "NGU":
      case "ESV":
        return upper;
      default:
        return "invalid";
    }
   } 
}
