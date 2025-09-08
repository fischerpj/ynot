// bible_api.js

// DEFINITION

async function fetchData(param = "gen1:1") {
    try {
        const url = `https://hall.pjafischer.workers.dev/passage/?param=${encodeURIComponent(param)}`;
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let data = await response.json();
        
        // Create an element to display output
//        let resultDiv = document.createElement("pre");
//        resultDiv.innerHTML = data.htmlraw;
//        resultDiv.textContent = JSON.stringify(data.htmlraw, null, 2);
        
        // Append it to the document
        const main = document.querySelector("mainAnchor");
//        document.body.appendChild(resultDiv);
        main.innerHTML = data.htmlraw;
//        main.appendChild(resultDiv);
    } catch (error) {
        console.error("Error fetching data:", error);
        
        let errorDiv = document.createElement("p");
        errorDiv.textContent = `Error fetching data: ${error.message}`;
        document.body.appendChild(errorDiv);
    }
}

// App
class App {

  constructor() {
    this.m_data = "new mStorage()"
    this.v_ui = "new View()";
//    this.c_addEventListeners();
    this.version = '0.4.1.0 bible_api.js'; 

  } // end of constructor
  
  async m_fetchPassage(param = "gen1:1") {
    try {
      const url = `https://hall.pjafischer.workers.dev/passage/?param=${encodeURIComponent(param)}`;
      const response = await fetch(url);

      if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the response is plain text
      console.log( data.htmlraw);
      return data;
    } catch (error) {
        console.error("Error fetching passage:", error);
    }
}

} // end of App

// EXECUTION

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
//    app.m_fetchPassage();
  //  app.m_init_load_();
  //  app.v_lastPayload();

  console.log(app);
}) // end of DOM listener