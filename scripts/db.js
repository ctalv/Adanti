// Initialize db
let db;
const dbName = "Adanti";
const dbOpenRequest = window.indexedDB.open(dbName, 2);

dbOpenRequest.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
    console.error(`Database error: ${event.target.error?.message}`);
};

dbOpenRequest.onsuccess = (event) => {
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
};


// TODO: Check widget preferences

// Initialize data
function displayData() {

    initializeWidgets();

    // Display Clock
    displayClock();
    // Display Apps
    getApps();
};

function getApps() {
    const objectStore = db.transaction("apps").objectStore("apps");
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        // Check if there are no (more) cursor items to iterate through
        if (!cursor) {
            // No more items to iterate through, we quit.
            appSubmit();
            return;
        }

        const { name, url, icon } = cursor.value;
        const id = cursor.key;
        displayApp(id, name, url, icon)

        cursor.continue();
    };
}


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
        clearWidget("app-widget");
        getApps();
        closeModals();
    };

    request.onerror = () => {
        console.error("Failed to save app:", request.error);
    };

}

// function editApp(event) {
//     const dataApp = event.target.getAttribute("data-app");
//     // Populate add/edit app modal form

//     const transaction = db.transaction(["apps"], "readwrite");
//     transaction.objectStore("apps").put(dataApp);

//     transaction.oncomplete = () => {
//         // Redisplay all apps
//         const appForm = document.getElementById("app-form");
//         appForm.removeEventListener("submit", editApp, false);
//         appForm.addEventListener("submit", addApp, false);
//     };
// }

function deleteApp(event) {
    const key = parseInt(event.target.parentNode.children.pk.value)
    const transaction = db.transaction(["apps"], "readwrite");
    transaction.objectStore("apps").delete(key);
    transaction.oncomplete = () => {
        // Redisplay all apps
        // clearWidget("app-widget");
        // getApps();
        event.target.parentElement.remove()
        closeModals();
        removeAppEditDeleteIcons();

    };
}
