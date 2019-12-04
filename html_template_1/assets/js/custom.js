$(document).ready(function () {
  
  $(document).on("click touchstart", function (event) {
    if ( !$(event.target).closest('.header__navbar').length ) {
      $('body').removeClass('open-nav');
    }
  });
  $('.header__navbar--toggle').click( function() {

    $(this).parents('body').toggleClass('open-nav');
  });
  $('.hamburger-toggle').click( function() {

    $(this).parents('body').toggleClass('open-nav');
  });
  /* desktop hamburger toggle will be hidden if .hamburger--nav has no li tags*/
  if (!($('.hamburger--nav').find('li').length) ){
    $('.hamburger-toggle').css("display", "none");
    console.log(length, "g");
  }
  $('.video-play').click(function () {
    $('.popup-video').fadeIn();
  });

  $('.btn-close').click(function () {
    $('.popup-video').fadeOut();
  });
  $('#video-play').on('click', function(ev) {
    $("#video")[0].src += "&autoplay=1";
    ev.preventDefault();
  });

  $('#btn-close').on('click', function() {
    $('#video').each(function(index) {
      $(this).attr('src', $(this).attr('src').replace('&autoplay=1', ''));
      return false;
    });
  });

  function toggleGMap() {
    if (document.getElementsByClassName('lightbox')[0].visible) {
      document.getElementsByClassName('lightbox')[0].classList.remove('lightbox-visible');
      document.getElementsByClassName('popup')[0].classList.remove('popup-visible');

      document.getElementsByClassName('lightbox')[0].visible = false;
    } else {
      document.getElementsByClassName('lightbox')[0].classList.add('lightbox-visible');
      document.getElementsByClassName('popup')[0].classList.add('popup-visible');

      document.getElementsByClassName('lightbox')[0].visible = true;
    }
  }

  document.getElementsByClassName('lightbox')[0].addEventListener('click', function () {
    toggleGMap();
  });
  document.getElementsByClassName('gmap')[0].addEventListener('click', function (e) {
    e.preventDefault();
  });

  // expandable contacts block
  document.getElementById('expandable-btn').addEventListener('click', function () {
    toggleGMap();

    if (!window.isMapInitialized) {
      window.initMap();
      window.isMapInitialized = true;
      window.GMap.setCenter( window.marker.position);
    }
  });
});

// Google map code
function initMap() {
  var expendableGMap = document.getElementsByClassName('gmap')[0];

  var mapLocation = {
    lat: Number(expendableGMap.getAttribute("lat")),
    lng: Number(expendableGMap.getAttribute("lng"))
  };

  window.GMap = new google.maps.Map(expendableGMap, {
    zoom: Number(expendableGMap.getAttribute("zoom")),
    center: mapLocation
  });
  window.marker = new google.maps.Marker({
    position: mapLocation,
    map: window.GMap
  });

  var contentString = document.getElementsByClassName('info')[0].innerHTML;
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  window.marker.addListener('click', function() {
    infowindow.open(window.GMap, window.marker);
  });

  infowindow.open(window.GMap, window.marker);
}
