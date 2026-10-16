const widgetEle = document.getElementById("widgets");

function displayWidgets() {

    // Display functions for inside widgets
    function displayApp(app) {
        // apps
        const appEle = document.createElement("div");
        appEle.setAttribute("class", "app");
        // TODO: determine list or grid (grid default)
        const imgEle = document.createElement("img");
        const aEle = document.createElement("a");
        imgEle.setAttribute("src", app.icon);
        aEle.setAttribute("href", app.url);

        appWidgetEle.appendChild(appEle);
        appEle.appendChild(aEle);
        aEle.appendChild(imgEle);
    }

    function displaySearch() {
        // search

    }

    function displayClock() {
        // clock
        const clockEle = document.createElement("div");
        clockEle.setAttribute("class", "clock");
        clockWidgetEle.appendChild(clockEle);

        function refreshClock() {
            refresh = 1000;
            mytime = setTimeout(function () { refreshClock(); }, refresh);
            var ClockDate = new Date();
            var NewDate = ClockDate.toDateString();
            NewDate = NewDate + "<br />" + ClockDate.toLocaleTimeString();
            clockEle.innerHTML = NewDate;

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

    // Display functions for widgets
    function displayClockWidget() {
        displayClock();
    }

    function displayAppWidget() {
        for (let i = 0; i < apps.length; i++) {
            displayApp(apps[i]);
        }
    }

    function displaySearchWidget() {
        displaySearch()
    }

    // Set all base widget divs
    const appWidgetEle = document.createElement("div");
    const clockWidgetEle = document.createElement("div");
    const searchWidgetEle = document.createElement("div");

    appWidgetEle.setAttribute("class", "app-widget");
    clockWidgetEle.setAttribute("class", "clock-widget");
    searchWidgetEle.setAttribute("class", "search-widget");

    widgetEle.appendChild(clockWidgetEle);
    widgetEle.appendChild(appWidgetEle);
    widgetEle.appendChild(searchWidgetEle);

    // TODO: If statement if widgets wanted
    displayClockWidget();
    displayAppWidget();
}

displayWidgets()

