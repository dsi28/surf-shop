require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_SURF_SHOP_TOKEN });


async function geocoder (location){
    const response = await geocodingClient.forwardGeocode({ 
        query: location,
        limit: 1
    }).send();
    const lng = response.body.features[0].geometry.coordinates[0];
    const lat = response.body.features[0].geometry.coordinates[1]
}
geocoder('cartagena');