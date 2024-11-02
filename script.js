const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

function envoy(){
    alert("Message sent successfully!");
}





function loadXMLMenu() {
    fetch('tree.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            
            function createProductHTML(productNode) {
                const title = productNode.querySelector("title") ? `<h3>${productNode.querySelector("title").textContent}</h3>` : '';
                const price = productNode.querySelector("price") ? `<p>Price: ${productNode.querySelector("price").textContent}</p>` : '';
                const description = productNode.querySelector("description") ? `<p>${productNode.querySelector("description").textContent}</p>` : '';
                const size = productNode.querySelector("size") ? `<p>Size: ${productNode.querySelector("size").textContent}</p>` : '';
                const image = productNode.querySelector("image") ? `<img src="${productNode.querySelector("image").textContent}" alt="${"Not Avaiable"}" class="product-image">` : '';
                
                return `<div class="product">${image}${title}${size}${price}${description}</div>`;
            }

            const foodSection = xmlDoc.querySelector("tableFood");
            if (foodSection) {
                const foodTitle = "<h2>Food Menu</h2>";
                const foodProducts = Array.from(foodSection.querySelectorAll("product")).map(createProductHTML).join("");
                document.getElementById("tableFood").innerHTML = `${foodTitle}${foodProducts}`;
            } 

            const hotBeverageSection = xmlDoc.querySelector("tableHotBeverage");
            if (hotBeverageSection) {
                const hotBeverageTitle = "<h2>Hot Beverages</h2>";
                const hotBeverageSubTitle = "<h3>Coffe, hot chocolate and tea</h3>";
                const hotBeverageProducts = Array.from(hotBeverageSection.querySelectorAll("product")).map(createProductHTML).join("");
                const hotBeverageDescription = hotBeverageSection.querySelector("description") ? `<p>${hotBeverageSection.querySelector("description").textContent}</p>` : '';
                document.getElementById("tableHotBeverage").innerHTML = `${hotBeverageTitle}${hotBeverageSubTitle}${hotBeverageProducts}${hotBeverageDescription}`;
            }

            const beverageSection = xmlDoc.querySelector("tableBeverage");
            if (beverageSection) {
                const beverageTitle = "<h2>Cold Beverages</h2>";
                const beverageProducts = Array.from(beverageSection.querySelectorAll("product")).map(createProductHTML).join("");
                document.getElementById("tableBeverage").innerHTML = `${beverageTitle}${beverageProducts}`;
            }
        })
        .catch(error => console.log("Error loading XML:", error));
}



function loadBranchInfo() {
    fetch('branches.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel caricamento del file XML");
            }
            return response.text();
        })
        .then(data => {
            console.log("XML caricato correttamente.");
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            function createBranchHTML(branchNode) {
                const street = branchNode.querySelector("street")?.textContent || "N/A";
                const city = branchNode.querySelector("city")?.textContent || "N/A";
                const state = branchNode.querySelector("state")?.textContent || "N/A";
                const contact = branchNode.querySelector("contact")?.textContent || "N/A";
                const weekdayHours = branchNode.querySelector("weekday")?.textContent || "N/A";
                const weekendHours = branchNode.querySelector("weekend")?.textContent || "N/A";
                const mapLink = branchNode.querySelector("mapLink")?.textContent || "#";

                return `
                    <div class="branch">
                        <h3>Branch</h3>
                        <p><strong>Address:</strong> ${street}, ${city}, ${state}</p>
                        <p><strong>Contact:</strong> ${contact}</p>
                        <p><strong>Opening Hours:</strong></p>
                        <p>Weekdays: ${weekdayHours}</p>
                        <p>Weekend: ${weekendHours}</p>
                        <p><a href="${mapLink}" target="_blank">Address on Google Maps</a></p>
                    </div>`;
            }

            const branches = Array.from(xmlDoc.querySelectorAll("branch")).map(createBranchHTML).join("");
            document.querySelector(".contactInfo").innerHTML = branches;
        })
        .catch(error => console.error("Error loading XML:", error));
}

loadBranchInfo();