# jQUery mapfu plugin

## Description

jQuery mapfu is a simple plugin to allow easy Google Map creation using version 3 of the JavaScript API. This means that an API key is not needed, but it also means that only features supported in V3 of the API are available to the plugin. Google is continually updating and adding new features to the API. I will continue to add more until the plugin supports all features in the V3 API and hopefully keep up with Google as they make changes.

## Usage

First, include jQuery, the Google Map JavaScript API, and this plugin:

  <script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false'></script>
  <script type='text/javascript' src='jquery.js'></script>
  <script type='text/javascript' src='jquery.mapfu.js'></script>

Next, include a div that will hold the map:

    <div id='map'></div>

Now just call the mapfu function on a DOM element. It is usually best to do this once the document is ready.

    $("#map").mapfu();

Since this just creates an empty map of the US, options must be passed to add desired functionality.

## Examples

[Download the project](http://github.com/geetarista/jquery.mapfu/tarball/master), then open examples.html in your browser to see a few examples.

## Options

The following options are available when calling the plugin. Defaults are shown in parentheses.

    data ([])
The objects that will be passed to create the markers and infowindows. As long as valid JSON is passed to this option, it doesn't care how it comes in. It could be manually written out, pulled from a back-end, or pulled in via getJSON and then passing it to the plugin. The only requirements are (1) include a root element that bundles all of the sub-elements in and (2) objects respond to "lat" and "lng" for the latitude and longitude values, respectively. I'm hoping to add a feature so this isn't a requirement and there are options to set these.

    latitude (null)
The central latitude point for the map.

    longitude (null)
The central longitude point for the map.

    title (function() {})
Function used to pass a string to the marker that is displayed on hover.

    html (function() {})
Function used to pass a string of HTML to an infowindow that is opened when the marker is clicked.

    zoom (8)
Set the zoom level of the map using an integer.

    mapType ("roadmap")
Sets the type of map to display. Available options are "roadmap", "satellite", "hybrid", "terrain".

    scrollwheel (true)
If false, disables scrollwheel zooming on the map.

    navigationControl (true)
If false, the pan/zoom control is hidden.

    mapTypeControl (true)
If false, the control to change map types is hidden.

    scaleControl (false)
If true, shows the map scale control.

    icon
A hash containing options for marker icons. See below for actual options.

    icon.image ('http://www.google.com/mapfiles/marker.png')
Reference to an image that is used for your markers.

## Notes

[Google Maps API V3](http://code.google.com/apis/maps/documentation/v3/)

## License

jQuery mapfu is under by the MIT License. See LICENSE for more information.
