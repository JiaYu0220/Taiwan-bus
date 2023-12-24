// Session Storage
function storedItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
function getStoredItem(key) {
  const storedItem = sessionStorage.getItem(key);
  return storedItem ? JSON.parse(storedItem) : null;
}

function storedLocalItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getStoredLocalItem(key) {
  const storedItem = localStorage.getItem(key);
  return storedItem ? JSON.parse(storedItem) : null;
}

// function storageSelectedRoute(city, routeName, from, to) {
//   const selectedRoute = {
//     city,
//     routeName,
//     from,
//     to,
//   };
//   sessionStorage.setItem("selectedRoute", JSON.stringify(selectedRoute));
// }

// function getSelectedRoute() {
//   return JSON.parse(sessionStorage.getItem("selectedRoute"));
// }

export { storedItem, getStoredItem, storedLocalItem, getStoredLocalItem };
