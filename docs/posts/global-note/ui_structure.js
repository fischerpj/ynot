  v_createMainDiv = function() {
    // mainDiv : check if it already exists
    if (!document.getElementById('mainDiv')) {
      mainDiv = document.createElement('div');
      mainDiv.id = 'mainDiv';
    }
  }  
    
  document.addEventListener("DOMContentLoaded", () => {
    console.log("ui_structure: true");
  })