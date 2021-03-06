mapboxgl.accessToken = mapbox_key;
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: post.geometry.coordinates,
  zoom: 5
});


// add markers to map
  // create a HTML element for each feature
  let el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(post.geometry.coordinates)
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
    $(this).siblings('.delete-review-form').toggle();
	});

$('.clear-rating').click(function(){
  $(this).siblings('.input-no-rate').click();
});
