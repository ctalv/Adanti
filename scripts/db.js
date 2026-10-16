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

function addApp() {
  // Open readwrite of db table
  const transaction = db.transaction(["apps"], "readwrite");

  // Once successful, do this
  transaction.oncomplete = () => {
      console.log("did it!")
      // displayApp();

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

