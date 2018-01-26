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
    if (document.getElementById('expandable').expanded) {
      document.getElementById('expandable').classList.remove('expandable-expanded');
      document.getElementById('expandable').expanded = false;

      document.body.classList.remove('expandable-expanded-container');
    } else {
      document.getElementById('expandable').classList.add('expandable-expanded');
      document.getElementById('expandable').expanded = true;

      document.body.classList.add('expandable-expanded-container');

      var totalScroll = (window.pageYOffset + 300) + 'px';
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

  var map = new google.maps.Map(expendableGMap, {
    zoom: 4,
    center: mapLocation
  });
  var marker = new google.maps.Marker({
    position: mapLocation,
    map: map
  });
}
