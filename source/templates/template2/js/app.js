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

});    