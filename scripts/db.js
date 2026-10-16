// Initialize db
let db;
const dbName = "Adanti";
const dbOpenRequest = window.indexedDB.open(dbName, 2);

dbOpenRequest.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
    console.error(`Database error: ${event.target.error?.message}`);
};

dbOpenRequest.onsuccess = (event) => {
    console.log("DB LOADED")
    db = dbOpenRequest.result;
    displayData();
};


dbOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    db.onerror = (event) => {
        console.error(`Database error: ${event.target.error?.message}`);
    };

    // Create an objectStore for this database
    const objectStore = db.createObjectStore("apps", { autoIncrement: true });

    // Define what data items the objectStore will contain
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("url", "url", { unique: false });
    objectStore.createIndex("icon", "icon", { unique: false });

    console.log("Object store created")
};


// TODO: Check widget preferences

// Initialize data
function displayData() {
    
    let apps = []

    const objectStore = db.transaction("apps").objectStore("apps");
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        // Check if there are no (more) cursor items to iterate through
        if (!cursor) {
            // No more items to iterate through, we quit.
            return;
        }

        const { name, url, icon } = cursor.value;
        apps.push({ name, url, icon })
    };

    let data = {
        apps: apps,
    }

    displayWidgets(data);

    // Declare any submit modals
    const appForm = document.getElementById("add-app-form");
    appForm.addEventListener("submit", addApp, false);
};

// Image handling
putImageInDb = function(blob, table, col) {
     var transaction = db.transaction([table], IDBTransaction.READ_WRITE);

    // Put the blob into the dabase
    var put = transaction.objectStore(table).put(blob, col);

    // Retrieve the file that was just stored
    transaction.objectStore(table).get(col).onsuccess = function (event) {
        var imgFile = event.target.result;
        var URL = window.URL || window.webkitURL;
        var imgURL = URL.createObjectURL(imgFile);
        return imgURL;
        // var imgElephant = document.getElementById("elephant");
        // imgElephant.setAttribute("src", imgURL);
        // URL.revokeObjectURL(imgURL);
    };
}

// Image handling
createImageBlob = function (formImage) {
    // Create XHR
    var xhr = new XMLHttpRequest(),
        blob;

    xhr.open("GET", formImage, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            console.log("Image retrieved");
            
            // Blob as response
            blob = xhr.response;
            console.log("Blob:" + blob);

            return blob
        }
    }, false);
    // Send XHR
    xhr.send();
}


// App handling
function addApp() {
    e.preventDefault();
    // Open readwrite of db table
    const transaction = db.transaction(["apps"], "readwrite");
    // Once successful, do this
    transaction.oncomplete = () => {
        console.log("did it!")
        
        displayApps();

    }

    transaction.onerror = () => {
        console.error(`Transaction not opened due to error: ${transaction.error}`);
    };


    const newItem = [
        {
            name: title.value,
            url: url.value,
            icon: createImageBlob(icon.value),
        },
    ];

    // Call an object store that's already been added to the database
    // transaction.objectStore("apps").put(blob, "icon");
    const objectStore = transaction.objectStore("apps");

    // Make a request to add our newItem object to the object store
    const objectStoreRequest = objectStore.add(newItem[0]);

    objectStoreRequest.onsuccess = (event) => {
        // Report the success of our request
        console.log("successfully added app")
        // Clear the form, ready for adding the next entry
        title.value = "";
        url.value = "";
        icon.value = "";
    };

};

function deleteApp(event) {
    const dataApp = event.target.getAttribute("data-app");

    const transaction = db.transaction(["apps"], "readwrite");
    transaction.objectStore("apps").delete(dataApp);

    transaction.oncomplete = () => {
        // Delete the parent of the button, which is the list item, so it is no longer displayed
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    };
}
