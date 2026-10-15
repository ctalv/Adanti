const widgetEle = document.getElementById("widgets");

function displayWidgets() {

    function displayApps() {
        // apps
        const divEle = document.createElement("div");
        console.log("made it")
        // TODO: determine list or grid (grid default)
        const imgEle = document.createElement("img");
        const aEle = document.createElement("a");
        imgEle.setAttribute("src", "assets/icons/netflix.png");
        aEle.setAttribute("href", "https://www.netflix.com/");
        
        aEle.appendChild(imgEle);
        widgetEle.appendChild(aEle);
    }

    function displaySearch() {
        // search
        
    }

    // TODO: check preferences and order
    displaySearch()
    displayApps()
}

displayWidgets()