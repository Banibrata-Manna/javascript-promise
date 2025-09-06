const productSku = '<Any Valid Product SKU>';

let allPickupLocations = [];
let storesWithInventory = [];

const storeLookupEndpoint = '<Backend Endpoint to fetch stores>';
const inventoryCheckEndpoint = '<Backend Endpoint to check inventory>';

const showOutOfStockStores = false;

let requestBodyParams = {};
let inventoryRequestBodyParams = {};

const fetchPickupStores = new Promise((resolve, reject) => {
  fetch(storeLookupEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...requestBodyParams
    })
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => resolve(data))
    .catch(error => reject(`Error fetching store data: ${error}`));
});

fetchPickupStores
  .then(stores => {
    allPickupLocations = stores.response;
    console.log('All Pickup Locations:', allPickupLocations);

    return fetch(inventoryCheckEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...inventoryRequestBodyParams
      })
    });
  })
  .then(response => response.json())
  .then(data => {
    storesWithInventory = data?.resultList?.filter(store => store.computedAtp > 0 || showOutOfStockStores);
    console.log('Stores with Inventory inside promise:', storesWithInventory);
    return storesWithInventory;
  })
  .catch(error => {
    console.error('Error in flow:', error);
  });


// This can be much more simplified using async/await

// const checkPickupInventory = async () => {
//   try {
//     const storeResponse = await fetch(storeLookupEndpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...requestBodyParams,
//       })
//     });

//     const storeData = await storeResponse.json();
//     allPickupLocations = storeData.response;
//     console.log('All Pickup Locations:', allPickupLocations);

//     const inventoryResponse = await fetch(inventoryCheckEndpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...inventoryRequestBodyParams,
//       })
//     });

//     const inventoryData = await inventoryResponse.json();
//     storesWithInventory = inventoryData?.resultList?.filter(store => store.computedAtp > 0 || showOutOfStockStores);
//     console.log('Stores with Inventory using async/await:', storesWithInventory);
//     return storesWithInventory;

//   } catch (error) {
//     console.error('Error in async/await flow:', error);
//   }
// };

// checkPickupInventory();

// Note: The above async/await function can be called to perform the same operations in a more readable manner.