document.addEventListener("DOMContentLoaded", () => {
    // Get the <main> element
    let main = document.querySelector("main");

    if (main) {
        // Ensure mainAnchor exists
        let mainAnchor = document.getElementById("mainAnchor");
        if (!mainAnchor) {
            mainAnchor = document.createElement("div");
            mainAnchor.id = "mainAnchor";
//            mainAnchor.textContent = "This is the main anchor div.";

            // Insert mainAnchor at the start of <main>
            main.insertBefore(mainAnchor, main.firstChild);
        }
        
        // Ensure outputDiv exists inside mainAnchor
        if (!document.getElementById("inputDiv")) {
            const inputDiv = document.createElement("div");
            inputDiv.id = "inputDiv";
            inputDiv.textContent = "Waiting for input...";
            mainAnchor.appendChild(inputDiv);
        }

        // Ensure outputDiv exists inside mainAnchor
        if (!document.getElementById("outputDiv")) {
            const outputDiv = document.createElement("div");
            outputDiv.id = "outputDiv";
            outputDiv.textContent = "Waiting for update...";
            mainAnchor.appendChild(outputDiv);
        }
    }
});