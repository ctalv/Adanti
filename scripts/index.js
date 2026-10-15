const widgetEle = document.getElementById("widgets");

function displayWidgets() {

    function displayApps(app) {
        // apps
        const divEle = document.createElement("div");
        divEle.setAttribute("class", "apps");
        // TODO: determine list or grid (grid default)
        const imgEle = document.createElement("img");
        const aEle = document.createElement("a");
        imgEle.setAttribute("src", "assets/icons/netflix.png");
        aEle.setAttribute("href", "https://www.netflix.com/");
        
        widgetEle.appendChild(divEle);
        divEle.appendChild(aEle);
        aEle.appendChild(imgEle);
    }

    function displaySearch() {
        // search
        
    }
    let apps = [1, 2, 3]
    // TODO: check preferences and order
    displaySearch()
    for (let i=0; i<=apps.length; i++) {
        displayApps(apps[i])
    }
}

displayWidgets()