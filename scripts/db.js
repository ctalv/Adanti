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
    
    initializeWidgets();


    const objectStore = db.transaction("apps").objectStore("apps");
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        // Check if there are no (more) cursor items to iterate through
        if (!cursor) {
            // No more items to iterate through, we quit.
            return;
        }

        const { name, url, icon } = cursor.value;
        displayApp(name, url, icon)

        cursor.continue();
    };

    // Declare any submit modals

    const appForm = document.getElementById("add-app-form");
    appForm.addEventListener("submit", addApp, false);
};

function addApp(e) {
    e.preventDefault();

    // Wait until the image has been downloaded
    const fileInput = document.getElementById("icon");
    const file = fileInput.files[0];

    const newItem = {
        name: title.value,
        url: url.value,
        icon: file
    };

    const transaction = db.transaction(["apps"], "readwrite");
    const objectStore = transaction.objectStore("apps");

    const request = objectStore.add(newItem);

    request.onsuccess = () => {
        console.log("App saved:", request.result);
        // displayApp(newItem);
    };

    request.onerror = () => {
        console.error("Failed to save app:", request.error);
    };

}

function deleteApp(event) {
    const dataApp = event.target.getAttribute("data-app");

    const transaction = db.transaction(["apps"], "readwrite");
    transaction.objectStore("apps").delete(dataApp);

    transaction.oncomplete = () => {
        // Delete the parent of the button, which is the list item, so it is no longer displayed
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    };
}

