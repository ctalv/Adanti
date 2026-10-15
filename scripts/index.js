const widgetEle = document.getElementById("widgets");

function displayWidgets() {

    function displayApps(app) {
        // apps
        const appEle = document.createElement("div");
        appEle.setAttribute("class", "app");
        // TODO: determine list or grid (grid default)
        const imgEle = document.createElement("img");
        const aEle = document.createElement("a");
        imgEle.setAttribute("src", app.icon);
        aEle.setAttribute("href", app.url);
        
        appsEle.appendChild(appEle);
        appEle.appendChild(aEle);
        aEle.appendChild(imgEle);
    }

    function displaySearch() {
        // search
        
    }
    // TODO: check preferences and order

    // TEST
    let apps = [
        {
            id: 1,
            name: "Netflix",
            url: "https://www.netflix.com/",
            icon: "assets/icons/netflix.png",
        },
        {
            id: 2,
            name: "Jellyfin",
            url: "https://www.netflix.com/",
            icon: "assets/icons/jellyfin.png",
        },
        {
            id: 3,
            name: "YouTube",
            url: "https://www.youtube.com/",
            icon: "assets/icons/youtube-new.png",
        }
    ]

    displaySearch()
    const appsEle = document.createElement("div");
    appsEle.setAttribute("class", "apps");
    for (let i=0; i<apps.length; i++) {
        displayApps(apps[i]);
    }

    widgetEle.appendChild(appsEle);
    
}

displayWidgets()