const axios = require('axios');


const controller = {

  searchForPlaces: async (req, res) => {

  const coordinates = req.body.location 

  function parseCoordinates(coordinates) {
    const { latitude, longitude } = coordinates;
    return `${latitude}, ${longitude}`;
  }
  
  let parsedCoordinates
  
  if(req.body.location) {
    const parsedCoordinates = parseCoordinates(coordinates);
    console.log(parsedCoordinates)
  }
 
  
  console.log(parsedCoordinates); // Output: "1.2902805, 103.8498438"
  

  const search_term= req.body.keyword

  console.log(search_term)

  // console.log(location)

  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;

  

  try {
    const response = await axios.get(apiUrl, {
      params: {
        location: parsedCoordinates || "1.3521,103.8198",
        radius: 5000,
        keyword: search_term,
        types:"restaurant",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    // console.log({
    //   status: response.data.status,
    //   results: response.data.results,
    // });


    console.log(response.data)
    

    res.json(response.data.results)
  } catch (error) {
    console.error('Error searching for places:', error.message);
    res.status(500).json({ error: 'An error occurred while searching for places.' });
  }
  
  }

}
// Calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}



// Find the nearest place from a list of places
function findNearestPlace(userLocation, places) {
  let nearestPlace = null;
  let nearestDistance = Infinity;

  places.forEach((place) => {
    const placeLocation = place.geometry.location;
    const distance = calculateDistance(
      userLocation[0],
      userLocation[1],
      placeLocation.lat,
      placeLocation.lng
    );

    if (distance < nearestDistance) {
      nearestPlace = place;
      nearestDistance = distance;
    }
  });

  return { place: nearestPlace, distance: nearestDistance };
}

// Main function to find nearest place for a specific keyword
async function findNearestPlaceByKeyword(userLocation, keyword) {
  try {
    const places = await searchForPlaces(userLocation, keyword);
    
    if (places.length === 0) {
      throw new Error(`No ${keyword} places found nearby`);
    }

    const nearest = findNearestPlace(userLocation, places);
    return nearest;
  } catch (error) {
    throw error;
  }
}

// Example usage
// const userLocation = [USER_LATITUDE, USER_LONGITUDE]; // Replace with your location
// const userKeyword = 'sushi'; // Replace with the keyword the user wants to search for
// findNearestPlaceByKeyword(userLocation, userKeyword)
//   .then((result) => {
//     if (result.place) {
//       console.log(`Nearest ${userKeyword} Place:`, result.place.name);
//       console.log('Address:', result.place.vicinity);
//       console.log('Distance:', result.distance.toFixed(2), 'km');
//     } else {
//       console.log(`No ${userKeyword} places found nearby.`);
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });


// // Example usage
// const location = 'LATITUDE,LONGITUDE'; // Replace with your coordinates
// searchRestaurantsNearMe(location)
//   .then((restaurants) => {
//     console.log('Restaurants near me:', restaurants);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });



  module.exports=controller