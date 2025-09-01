  v_createInputDiv = function() {
    inputDiv = document.getElementById('inputDiv');
    inputDiv.classList.add('row', 'container');
    inputDiv.innerHTML = "";
    
    loadButton = document.createElement('button');
    loadButton.id = 'loadButton';
    loadButton.textContent = 'Load';
    loadButton.classList.add("btn", "btn-primary");
    
    inputDiv.appendChild(loadButton);

    editorDiv = document.getElementById('editorjs');
    editorDiv.innerHTML = "";
  }  
    
  document.addEventListener("DOMContentLoaded", () => {
    v_createInputDiv();
    console.log("ui_structure: true");
  })