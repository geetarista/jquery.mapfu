/**
 * jQuery mapit Plugin
 * Version: 1.0.1
 * URL: http://github.com/geetarista/jquery.mapit
 * Description: Easy integration with Google Maps (JS API V3).
 * Usage: See README for more information.
 * Requires: jQuery 1.3 or higher (may work below 1.3; just not tested)
 * Author: Robby Colvin
 * http://robbycolvin.com
 * Copyright: Copyright 2009 Robby Colvin
 * Licensed under MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {

  $.fn.mapit = function(options) {

    // Set up opts hash
    var opts = $.extend({}, $.fn.mapit.defaults, options);

    // Cycle through each DOM element invoked with plugin
    return this.each(function() {

      // Set the root key for the json object since it is unkown
      // TODO: See if there is another way to accomplish this
      var keys = [];
      for (key in opts.data[0]) {
        keys.push(key);
      }
      var rootKey = keys[0];

      // Initiate array to hold marker html contents
      var htmlArray = [];

      // Set latitude and longitude if no option is given
      if (opts.latitude == null && opts.longitude == null) {
        // Set lat/lng for first object if exists
        if (opts.data.length > 0) {
          opts.latitude = opts.data[0][rootKey].lat;
          opts.longitude = opts.data[0][rootKey].lng;
        } else {
          // Set default lat/lng to US center
          opts.latitude = 37.0625;
          opts.longitude = -95.677068;
        }
      }

      // Map options when initializing map object
      // API requires this and cannot be done dynamically
      var mapOptions = {
        scrollwheel: opts.scrollwheel,
        navigationControl: opts.navigationControl,
        mapTypeControl: opts.mapTypeControl,
        scaleControl: opts.scaleControl
      }

      // Initialize Google Map object
      var map = new google.maps.Map(this, mapOptions);

      // Set center of map
      map.setCenter(new google.maps.LatLng(opts.latitude, opts.longitude));

      // Set zoom level for map
      map.setZoom(opts.zoom);

      // Set type of map
      switch(opts.mapType) {
        case "satellite":
          map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case "hybrid":
          map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          break;
        case "terrain":
          map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
          break;
        default:
          map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      }

      // Set up infowindow object
      var infowindow = new google.maps.InfoWindow();

      // Iterate through data and create a marker for each item
      // TODO: Add further support for icon options

      // If opts.data contains elements
      if (opts.data.length > 0) {
        // Iterate through each object found in JSON
        $.each(opts.data, function(i, item) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item[rootKey].lat, item[rootKey].lng),
            map: map,
            icon: opts.icon.image,
            title: opts.title(item[rootKey]),
            zIndex: i
          });
          
          if (opts.html) {
            // Add html for this marker to array
            htmlArray[i] = opts.html(item[rootKey]);

            // Create a click event listener for this marker and open infowindow
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(htmlArray[i]);
              infowindow.open(map, marker);
            });

            // Event listener to close infowindow when map is clicked
            google.maps.event.addListener(map, "click", function(){
              infowindow.close();
            });
          }
        }); // end $.each function
      }
    }); // end return this.each function
  }; // end $.fn.mapit

  // Set plugin defaults
  $.fn.mapit.defaults = {
    latitude: null,
    longitude: null,
    navigationControl: true,
    mapTypeControl: true,
    scaleControl: false,
		zoom: 8,
    data: [],
		scrollwheel: true,
    icon: {
      image: 'http://www.google.com/mapfiles/marker.png'
		},
    html: function() {},
    title: function() {}
  }; // end $.fn.mapit.defaults

})(jQuery); // end closure wrapper
