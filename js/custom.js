
var map;
var geocoder;
var latLng;
var locMarker;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'));
	var styles = [
	    {
	        "featureType": "all",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#191f1f"
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#a4b0b0"
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "weight": "1.5"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.country",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#0c0e0e"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.country",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#9a9a9a"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#191f1f"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.man_made",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#191f1f"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#0c0e0e"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural.landcover",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#0c0e0e"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural.terrain",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#223030"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#38a6a6"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#52c2c2"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#38a6a6"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#38a6a6"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#080b0b"
	            },
	            {
	                "weight": "0.80"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#3f3f3f"
	            },
	            {
	                "weight": "0.50"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#080b0b"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#2c3434"
	            },
	            {
	                "weight": "0.41"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#c6d4ec"
	            }
	        ]
	    }
	];
	map.setOptions({styles: styles});
	console.log("Setting map center");
	map.setCenter(new google.maps.LatLng(41.228972, -101.740995));

	console.log("Setting map zoom");
	map.setZoom(4);

	if (navigator.geolocation) {
		setTimeout(setUserLocation, 500);
	} else {
		alert("Looks like this device isn't supported for Stratos :(");
	}

	//map.setCenter(latLng);
	console.log("Setting RTL listener");
	setTimeout(function() {
		$('#rtl').on('click', function() {
			map.panTo(latLng);
			map.setZoom(18);
		})
	}, 1500);

	//geocoder = new google.maps.Geocoder();
	//geolocate(geocoder, home, false);
}

function setUserLocation() {
	var optn = {
		enableHighAccuracy: true,
		timeout: Infinity,
		maximumAge: 0 
	};
	navigator.geolocation.watchPosition(
			function(position) {
				//console.log("SUCCESS");
				//console.log("\tLock: " + position.coords.latitude + ", " + position.coords.longitude);
				latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				if (position.coords.latitude != 0 && position.coords.longitude != 0) {
					if (!locMarker) {
						locMarker = new google.maps.Marker({
				  			map: map,
				  			position: latLng,
				  			icon: 'img/current.png'
				  		});
				  		setTimeout(function(latLng) {
							map.panTo(latLng);
							map.setZoom(18);
					}, 1500, latLng);
					} else {
						locMarker.setPosition(latLng);
					}
				}
			}, 
			function() {
				console.log("FAILURE");
			}, 
			optn
	);
}

function setMapZoom(zoom) {
	map.setZoom(zoom);
}

function geolocate(geocoder, address, marker) {
	geocoder.geocode({'address': address}, function(results, status) {
	  	if (status == google.maps.GeocoderStatus.OK) {
	  		var zoomLevel = 12;
	  		if (marker) {
	  			console.log(results[0].geometry.location);
	  			var markerLatLng = new google.maps.Marker({
		  			map: map,
		  			position: results[0].geometry.location,
		  			icon: 'img/full.png',
		  			animation: google.maps.Animation.DROP
		  		});
		  		//console.log(address + " => " + markerLatLng.position);
		  		zoomLevel += 5;
	  		}
	  		map.panTo(results[0].geometry.location);
	  		map.setZoom(zoomLevel);
	  	} else {
	  		console.log("Maps API error: " + status);
	  	}
	});
}