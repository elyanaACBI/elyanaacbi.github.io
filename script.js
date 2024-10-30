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
                const hotBeverageProducts = Array.from(hotBeverageSection.querySelectorAll("product")).map(createProductHTML).join("");
                const hotBeverageDescription = hotBeverageSection.querySelector("description") ? `<p>${hotBeverageSection.querySelector("description").textContent}</p>` : '';
                document.getElementById("tableHotBeverage").innerHTML = `${hotBeverageTitle}${hotBeverageProducts}${hotBeverageDescription}`;
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