$(document).ready(function () {


  $(document).on("click touchstart", function (event) {
    if ( !$(event.target).closest('.header__navbar').length ) {
      $('body').removeClass('open-nav');
    }
  });

  $('.navbar-toggle').click( function() {

    $(this).parents('body').toggleClass('open-nav');
  });

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

  // expandable contacts block
  document.getElementById('expandable-btn').addEventListener('click', function () {

    if (!window.isMapInitialized) {
      window.initMap();
      window.isMapInitialized = true;
    }

    google.maps.event.trigger(window.GMap, 'resize');

    setTimeout(function() {
      google.maps.event.trigger(window.GMap, 'resize');
      window.GMap.setCenter( window.marker.position);
    }, 1000);

    if (document.getElementById('expandable').expanded) {
      document.getElementById('expandable').classList.remove('expandable-expanded');
      document.getElementById('expandable').expanded = false;

      if (document.getElementsByClassName('indexpage')[0]) {
        document.getElementsByClassName('indexpage')[0].style.height = 'auto';
      }

      document.body.classList.remove('expandable-expanded-container');
    } else {
      document.getElementById('expandable').classList.add('expandable-expanded');
      document.getElementById('expandable').expanded = true;

      document.body.classList.add('expandable-expanded-container');

      // block flex ability
      if (document.getElementsByClassName('indexpage')[0]) {
        document.getElementsByClassName('indexpage')[0].style.height = document.getElementsByClassName('indexpage')[0].clientHeight + 'px';
      }

      var totalScroll = (window.pageYOffset + 300) + 'px';
      console.log(totalScroll);
      $('body, html').animate({scrollTop: totalScroll}, 1000);
    }
  })
});

// Google map code
function initMap() {
  var expendableGMap = document.getElementById('expandablegmap');

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
}
