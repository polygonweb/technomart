const BASE_URL = 'https://maps.googleapis.com/maps/api/js?key=';
const API_KEY = 'AIzaSyCULdjmspwskYFN6iKnsHPK5u_Lkmi-iNY';

function getScriptUrl() {
  return BASE_URL + API_KEY;
}

function GoogleMap(options) {
  this.options = options;
  this.rootElement = options.rootElement;
  this.mapOptions = options.mapOptions;
  this.map = null;
  this.googleMaps = null;

  this.onInit = options.onInit;
  this.init = this.init.bind(this);
  this.init();
}

GoogleMap.prototype.loadScript = function(callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  var scriptSrc = getScriptUrl();

  script.onload = function() {
      callback(window.google.maps);
      script.onload = script.onerror = null;
  };

  script.onerror = function() {
      console.error('Ошибка загрузки Google Maps');
      script.onload = script.onerror = null;
  }

  script.src = scriptSrc;

  document.body.appendChild(script);
}

GoogleMap.prototype.init = function() {
  var self = this;
  self.loadScript(function(gmaps) {
      var options = self.mapOptions(gmaps);
      var map = new gmaps.Map(self.rootElement, options);
      self.googleMaps = gmaps;
      self.map = map;
      self.onInit(gmaps, map);
  });
}

export default GoogleMap;
