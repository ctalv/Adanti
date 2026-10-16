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
    const objectStore = db.transaction("apps").objectStore("apps");

    objectStore.openCursor().onsuccess = (event) => {
        console.log(objectStore);
        console.log(event.target.result);
        const cursor = event.target.result;
        // Check if there are no (more) cursor items to iterate through
        if (!cursor) {
            // No more items to iterate through, we quit.
            return;
        }

        const { name, url, icon } = cursor.value;
    };

    displayWidgets();

    // Declare any submit modals
    const appForm = document.getElementById("add-app-form");
    appForm.addEventListener("submit", addApp, false);
};


function addApp(e) {
    e.preventDefault();
    // Open readwrite of db table
    console.log(db)
    const transaction = db.transaction(["apps"], "readwrite");
    console.log(transaction)
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
            icon: icon.value,
        },
    ];

    // Call an object store that's already been added to the database
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

