jQuery(document).ready(function () { 
  

	jQuery(document).on("click touchstart", function (event) {
		if ( !jQuery(event.target).closest('.header-navbar').length ) {
		 jQuery('body').removeClass('open-nev');  
		} 
	}); 
   
     jQuery('.navbar-toggle').click( function() {
	
		jQuery(this).parents('body').toggleClass('open-nev');
	});
    
 jQuery('.video-play').click(function () {
        jQuery('.popup-video').fadeIn();
    });
    
 jQuery('.btn-close').click(function () {
        jQuery('.popup-video').fadeOut();
    });
    
  jQuery('#video-play').on('click', function(ev) { 
    jQuery("#video")[0].src += "&autoplay=1";
    ev.preventDefault();
  });   
     
 jQuery('#btn-close').on('click', function() { 
    jQuery('#video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');     
 });
     
});    
 