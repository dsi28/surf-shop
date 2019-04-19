mapboxgl.accessToken = mapbox_key;
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: post.coordinates,
  zoom: 5
});

let geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: post.coordinates
    },
    properties: {
      title: 'Mapbox',
      description: 'Washington, D.C.'
    }
  }]
};

// add markers to map
  // create a HTML element for each feature
  let el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + post.title + '</h3><p>' + post.desc + '</p>'))
  .addTo(map);


  //toggle review form edit update
	$('.toggle-edit-form').on('click', function(){
		if($(this).text() == 'Edit'){
			$(this).text('Cancel');
		}else{
			$(this).text('Edit');
		} 
		$(this).siblings('.edit-review-form').toggle();
	});

