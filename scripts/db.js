let db;
const dbName = "Adanti";
const dbOpenRequest = window.indexedDB.open(dbName, 2);

dbOpenRequest.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
  console.error(`Database error: ${event.target.error?.message}`);
};

dbOpenRequest.onsuccess = (event) => {
  console.log("DB LOADED")
  db = event.target.result;
};


dbOpenRequest.onupgradeneeded = (event) => {
  db = event.target.result;

  db.onerror = (event) => {
    console.error(`Database error: ${event.target.error?.message}`);

    // note.appendChild(createListItem("Error loading database."));
  };

  // Create an objectStore for this database
  const objectStore = db.createObjectStore("apps", { autoIncrement: true });

  // Define what data items the objectStore will contain
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("url", "url", { unique: false });
  objectStore.createIndex("icon", "icon", { unique: false });

  console.log("Object store created")
};


// request.onupgradeneeded = (event) => {
//   // Create an objectStore to hold information about our customers. We're
//   // going to use "ssn" as our key path because it's guaranteed to be
//   // unique - or at least that's what I was told during the kickoff meeting.
//   const objectStore = db.createObjectStore("apps", { keyPath: "id" });

//   // Create an index to search customers by name. We may have duplicates
//   // so we can't use a unique index.
//   objectStore.createIndex("name", "name", { unique: false });

//   // Use transaction oncomplete to make sure the objectStore creation is
//   // finished before adding data into it.
//   objectStore.transaction.oncomplete = (event) => {
//     // Store values in the newly created objectStore.
//     const appObjectStore = db
//       .transaction("apps", "readwrite")
//       .objectStore("apps");
//     appData.forEach((app) => {
//     appObjectStore.add(app);
//     });
//   };
// };