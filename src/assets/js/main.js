(function(){

  "use strict";

  // Variables
  // =========================================================================================
  var $html = $('html'),
      $document = $(document),
      $window = $(window),
      i = 0;


  // Scripts initialize
  // ===================

  document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

  $window.on('load', function () {

    // =================================================================================
    // Preloader
    // =================================================================================
    var $preloader = $('#page-preloader');
    $preloader.delay(100).fadeOut('slow');

    // =================================================================================
    // WOW
    // =================================================================================
    new WOW().init();

    // =================================================================================
    // Google Map
    // =================================================================================
    var map = $(".map");
    if(map.length){
      var mapWrapper = $('#google-map'),
          latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
          styles = [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "color": "#e9e9e9" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 29 },
              { "weight": 0.2 }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 18 }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 21 }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              { "color": "#dedede" },
              { "lightness": 21 }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              { "visibility": "on" },
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              { "saturation": 36 },
              { "color": "#333333" },
              { "lightness": 40 }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f2f2f2" },
              { "lightness": 19 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 17 },
              { "weight": 1.2 }
            ]
          }
        ],
          myOptions = {
            scrollwheel: false,
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: false,
            styles: styles
          },
          map = new google.maps.Map(mapWrapper[0], myOptions),
          marker = new google.maps.Marker({
            position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
            draggable: false,
            animation: false,
            map: map,
            icon: 'img/marker.png'
          }),
          infowindow = new google.maps.InfoWindow({
            content: mapWrapper.data("text")
          });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

  });


  $document.ready(function () {

    // =================================================================================
    // Contact Form
    // =================================================================================
    var contactForm = $(".contact-form");
    if(contactForm.length){
      var contactResault = $("body").append("<span class='form-resault'></span>").find(".form-resault");
      contactForm.each(function(){
        var this_form = $(this);
        var contactFormInput = this_form.find(".form-control.required");

        contactFormInput.on("blur", function(){
          if(!$.trim($(this).val())){
            $(this).parent().addClass("input-error");
          }
        });

        contactFormInput.on("focus", function(){
          $(this).parent().removeClass("input-error");
        });

        this_form.on("submit", function() { 
          var form_data1 = $(this).serialize();
          if(!contactFormInput.parent().hasClass("input-error") && contactFormInput.val()){
            $.ajax({
              type: "POST", 
              url: "php/contact.php", 
              data: form_data1,
              success: function() {
                contactResault.addClass("correct");
                contactResault.html("Your data has been sent!");
                setTimeout(function(){
                  contactResault.removeClass("incorrect").removeClass("correct");
                }, 4500);
              }
            });
          } else{ 
            if(contactFormInput.val() === ""){
              var contactFormInputEmpty = contactFormInput.filter(function(){ 
                return $(this).val() === ""; 
              });
              contactFormInputEmpty.parent().addClass("input-error");
            }
            contactResault.addClass("incorrect");
            contactResault.html("You must fill in all required fields");
            setTimeout(function(){
              contactResault.removeClass("incorrect").removeClass("correct");
            }, 4500);
          }
          return false;
        }); 
      });
    }

    // =================================================================================
    // jQuery ajaxChimp
    // =================================================================================
    var chimpForm = $('.subscription-form');
    chimpForm.ajaxChimp({
      callback: function(){
        var panel = $('.js-result');
        setTimeout(function () {
          panel.removeClass("error").removeClass("success");
        }, 4500);
      },
      language: 'cm',
      url: '//adr.us14.list-manage.com/subscribe/post?u=474217a166648c3e7e0c53b55&amp;id=57bd6ccefc'
      //XXX.us13.list-manage.com/subscribe/post?u=YYY&amp;id=ZZZ
    });
    $.ajaxChimp.translations.cm = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    // =================================================================================
    // Fancybox
    // =================================================================================
    var fancybox = $(".fancybox");
    if(fancybox.length){
      fancybox.fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
      });
    }
    var fancybox_media = $('.fancybox-media');
    if(fancybox_media.length){
      fancybox_media.fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade',
        helpers : {
          media : {}
        }
      });
    }

    // =================================================================================
    // Typed effect
    // =================================================================================
    $(".typed").typed({
      stringsElement: $(".typed-string"),
      typeSpeed: 50,
      backDelay: 1200,
      loop: true,
      cursorChar: "",
    });

    // =================================================================================
    // Responsive Nav
    // =================================================================================
    var responsiveNav = new Navigation({
      init: true,
      stuck: true,
      responsive: true,
      breakpoint: 992, // don't forget to change in css as well
    });

    // =================================================================================
    // Parallalx.js
    // =================================================================================
    var parallax = $('.parallax-bg');
    if (parallax.length > 0) {
      parallax.parallax();
    }

    // =================================================================================
    // UIToTop
    // =================================================================================
    $().UItoTop();
   
    // =================================================================================
    // Owl carousel
    // =================================================================================    
    var slider_1 = $('.slider_1');
    if (slider_1.length) {
      slider_1.owlCarousel({
        mouseDrag: true,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        dots: false,
        items: 2,
        responsive:{
          0:{ items: 1, },
          992:{ items: 2, },
        }
      });
    }
    var slider_2 = $('.slider_2');
    if (slider_2.length) {
      slider_2.owlCarousel({
        mouseDrag: false,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        dots: false,
        items: 3,
        margin: 30,
        responsive:{
          0:{ items: 1, },
          768:{ items: 2, },
          992:{ items: 3, },
        }
      });
    }

    // =================================================================================
    // ISOTOPE
    // =================================================================================
    var isotope = $('.iso');
    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      if(isotope.length){
        var timeout;
        return function debounced() {
          if ( timeout ) {
            clearTimeout( timeout );
          }
          function delayed() {
            fn();
            timeout = null;
          }
          timeout = setTimeout( delayed, threshold || 100 );
        }
      }
    }
    if (isotope.length) {
      $( function() {
        var $grid = $('.grid').isotope({
          itemSelector: 'article'
        });
        // filter buttons
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
          $window.trigger("resize");
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });
      
      $window.on("load", function() {
        $('.iso .button-group button.is-checked').trigger("click");
      });
    }

    // =================================================================================
    // FSS
    // =================================================================================
    function initialise() {
      scene.add(mesh);
      scene.add(light);
      container.appendChild(renderer.element);
      window.addEventListener('resize', resize);
    }
    function resize() {
      var width = container.offsetWidth, // No need to query these twice, when in an onresize they can be expensive
          height = container.offsetHeight;
      renderer.setSize(width, height);
      scene.remove(mesh); // Remove the mesh and clear the canvas
      renderer.clear();
      geometry = new FSS.Plane(width, height, 10, 12); // Recreate the plane and then mesh
      mesh = new FSS.Mesh(geometry, material);
      scene.add(mesh); // Readd the mesh
    }
    function animate() {
      now = Date.now() - start;
      light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), 60);
      renderer.render(scene);
      requestAnimationFrame(animate);
    }
    var canvasAnim = $('.fss');
    if (canvasAnim.length) {
      var container = document.getElementById('fss'),
          renderer = new FSS.CanvasRenderer(),
          scene = new FSS.Scene(),
          light = new FSS.Light('#111122', '#00C5FF'),
          geometry = new FSS.Plane(container.offsetWidth, container.offsetHeight, 10, 12),
          material = new FSS.Material('#FFFFFF', '#FFFFFF'),
          mesh = new FSS.Mesh(geometry, material),
          now, start = Date.now();

      initialise();
      resize();
      animate();
    }

    // =================================================================================
    // Color Switcher
    // =================================================================================
    var switcher = $("#style-switcher");
    var switcher_toggle = switcher.find(".toggle-switcher");
    if (switcher.length){
      switcher_toggle.on("click", function(e){
        e.preventDefault();
        switcher.toggleClass("active");
      });
      var color_stylesheet = $("#colors");
      var color_link = $("#style-switcher .colors > li > a");
      color_link.each(function(){
        var it = $(this);
        it.on("click", function(){
          var color_src = it.attr("data-color-src");
          color_stylesheet.attr("href", color_src);
          return false;
        });
      });
    };


  });

})();