const widgetEle = document.getElementById("widgets");

function appendModal(modalID, popModalBtn) {
    // Get the modal
    var modal = document.getElementById(modalID);

    // Get the button that opens the modal
    var btn = document.getElementById(popModalBtn);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    } 
}

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
    // let apps = [
    //     {
    //         id: 1,
    //         name: "Netflix",
    //         url: "https://www.netflix.com/",
    //         icon: "assets/icons/netflix.png",
    //     },
    //     {
    //         id: 2,
    //         name: "Jellyfin",
    //         url: "https://www.netflix.com/",
    //         icon: "assets/icons/jellyfin.png",
    //     },
    //     {
    //         id: 3,
    //         name: "YouTube",
    //         url: "https://www.youtube.com/",
    //         icon: "assets/icons/youtube-new.png",
    //     }
    // ]
    let apps = []

    // Display functions for widgets
    function displayClockWidget() {
        displayClock();
    }

    function displayAppWidget(apps) {
        if (apps) {
            for (let i = 0; i < apps.length; i++) {
                displayApp(apps[i]);
            }
        };
        // Add app button
        const addAppEle = document.createElement("div");
        addAppEle.setAttribute("class", "add-app");
        const pEle = document.createElement("button");
        pEle.setAttribute("id", "add-app-button");
        pEle.innerHTML = "+"
        appWidgetEle.appendChild(addAppEle);
        addAppEle.appendChild(pEle);

        // Add app modal
        const htmlModal = `
            <div id="add-app-modal" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                    <div class="modal-heading">Add new app
                    <span class="close">&times;</span>
                    </div>
                    
                    <form id="add-app-form" class="modal-form">
                        <label for="title">Title: </label>
                        <input type="text" id="title" name="title">
                        <label for="url">URL: </label>
                        <input type="url" id="url" name="url">
                        <label for="icon" class="custom-file-upload">Icon: </label>
                        <input type="file" id="icon" name="icon">
                        <input type="submit" id="add-app-submit" value="Submit">
                    </form>
                </div>

            </div>
        `;

        document.getElementById("page").innerHTML += htmlModal;

        appendModal("add-app-modal", "add-app-button");


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


