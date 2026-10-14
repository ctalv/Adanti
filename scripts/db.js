let db;
const dbName = "Adanti";
const request = window.indexedDB.open(dbName, 1);

request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
  console.error(`Database error: ${event.target.error?.message}`);
};

request.onsuccess = (event) => {
  db = event.target.result;
};

request.onupgradeneeded = (event) => {
  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("apps", { keyPath: "id" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const appObjectStore = db
      .transaction("apps", "readwrite")
      .objectStore("apps");
    appData.forEach((app) => {
    appObjectStore.add(app);
    });
  };
};