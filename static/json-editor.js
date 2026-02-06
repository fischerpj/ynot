document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");
  const pretty = document.getElementById("pretty");
  const error = document.getElementById("error");
  
  function update() {
    try {
      const obj = JSON.parse(editor.value);
      pretty.textContent = JSON.stringify(obj, null, 2);
      error.textContent = "";
    } catch (e) {
      pretty.textContent = "";
      error.textContent = e.message;
    }
  }
  
  editor.addEventListener("input", update);
  update();
});
