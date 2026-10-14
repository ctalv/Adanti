// Let us open our database
const request = window.indexedDB.open("Adanti");

request.onerror = (event) => {
  // Do something with request.error!
};
request.onsuccess = (event) => {
  // Do something with request.result!
};