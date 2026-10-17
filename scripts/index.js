const widgetEle = document.getElementById("widgets");

// Set all base widget divs
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

function displayApp(alt, url, src) {
    // apps
    const appWidgetEle = document.getElementById("app-widget")
    const appEle = document.createElement("div");
    appEle.setAttribute("class", "app");
    // TODO: determine list or grid (grid default)
    const imgEle = document.createElement("img");
    const aEle = document.createElement("a");

    var URL = window.URL || window.webkitURL;
    var imgURL = URL.createObjectURL(src);

    imgEle.setAttribute("src", imgURL);
    imgEle.setAttribute("alt", alt);
    aEle.setAttribute("href", url);

    
    appWidgetEle.appendChild(appEle);
    appEle.appendChild(aEle);
    aEle.appendChild(imgEle);
}

function displaySearch() {
    // search
    

}

function displayClock() {
    // clock
    const clockWidgetEle = document.getElementById("clock-widget")
    const clockEle = document.createElement("div");
    clockEle.setAttribute("class", "clock");
    clockWidgetEle.appendChild(clockEle);

    function refreshClock() {
        refresh = 1000;
        mytime = setTimeout(function () { refreshClock(); }, refresh);
        var ClockDate = new Date();
        var NewDate = ClockDate.toDateString();
        NewDate = NewDate + "<br />" + ClockDate.toLocaleTimeString();
        document.getElementsByClassName("clock")[0].innerHTML = NewDate;
    }

    document.getElementsByName("body").onload = refreshClock();
}

function initializeWidgets() {

    // Display functions for inside widgets
    
    // TODO: check preferences and order


    // Display functions for widgets
    function initializeClockWidget() {
        const clockWidgetEle = document.createElement("div");
        clockWidgetEle.setAttribute("id", "clock-widget");
        widgetEle.appendChild(clockWidgetEle);
    }

    function initializeSearchWidget() {
        const searchWidgetEle = document.createElement("div");
        searchWidgetEle.setAttribute("id", "search-widget");
        widgetEle.appendChild(searchWidgetEle);
    }

    function initializeAppWidget() {
        const appWidgetEle = document.createElement("div");
        appWidgetEle.setAttribute("id", "app-widget");
        widgetEle.appendChild(appWidgetEle);

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


    // TODO: If statement if widgets wanted and order
    initializeClockWidget();
    initializeAppWidget();

    
}


