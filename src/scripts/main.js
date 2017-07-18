import 'dom4/build/dom4.js';
import 'svgxuse/svgxuse.js';

import modal from 'components/modal';
import Slider from 'components/slider';
import GoogleMap from 'components/map';

// slider
// =============================================================================
let sliderElem = document.querySelector('.slider');
if (sliderElem) {
  new Slider(sliderElem);
}


// google map
// =============================================================================
let mapContainer = document.querySelector('.map');
let mapContent = document.getElementById('contact-map')
let mapModal = document.getElementById('contact-map-modal');
let mapTrigger = document.querySelector('.contacts-map');
let gMap;

mapTrigger && mapTrigger.addEventListener('click', function(e) {
  modal(mapModal).open();

  if (mapContainer && !gMap) {
    gMap = new GoogleMap({
      rootElement: mapContent,
      mapOptions: function(gmaps) {
          return {
              center: new gmaps.LatLng(59.938791, 30.323144),
              zoom: 17
          }
      },
      onInit: function(googleMaps, map) {
        let marker = new googleMaps.Marker({
          position: new googleMaps.LatLng(59.938791, 30.323144)
        });
        marker.setMap(map);
        googleMaps.event.addListenerOnce(map, /*'idle'*/ 'tilesloaded', function() {
          mapContainer.classList.add('map_load');
        });
      }
    });
  };

  e.preventDefault();
});

