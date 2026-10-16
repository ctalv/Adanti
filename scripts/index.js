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

    function displayClock() {
        // clock

        function refreshClock() {
            refresh = 1000;
            mytime = setTimeout(function() {refreshClock();}, refresh);
            var ClockDate = new Date();
            var NewDate = ClockDate.toDateString();
            NewDate = NewDate + " - " + ClockDate.toLocaleTimeString();
            document.getElementById("clock").innerHTML = NewDate;

        }
        
       document.getElementsByName("body").onload = refreshClock();
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

    const clockEle = document.createElement("div");
    clockEle.setAttribute("class", "clock");
    clockEle.setAttribute("id", "clock");
    widgetEle.appendChild(clockEle);
    displayClock();

    const appsEle = document.createElement("div");
    appsEle.setAttribute("class", "apps");
    widgetEle.appendChild(appsEle);
    for (let i=0; i<apps.length; i++) {
        displayApps(apps[i]);
    }


    
}

displayWidgets()