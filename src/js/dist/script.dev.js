"use strict";

$(document).ready(function () {
  var hamburger = $(".hamburger");
  var body = $('body');
  var flag = false;
  hamburger.on('click', function () {
    if (!flag) {
      $('.header__menu ul').clone().appendTo('.mob-menu');
      flag = true;
    }

    hamburger.toggleClass("is-active");
    body.toggleClass('menu-open');
    $('.mob-menu').slideToggle();
  });

  if ($('.desk-svg').length > 0) {
    var path = document.querySelector('.path');
    var start_point = document.getElementById('start-point');
    $(window).scroll(function () {
      if ($(window).scrollTop() > $('.development-block').offset().top) {
        var scrollTop = $(window).scrollTop();
        var start_block = $('.development-block').offset().top;
        var height = $('.development-block').outerHeight();
        var path_distance = (scrollTop - start_block) / height * 100 * 4.6;

        if (path_distance > 100) {
          path_distance = 100;
        }

        var svg_path_distance = 1000 - path_distance * 9.9;

        if (svg_path_distance < 40) {
          svg_path_distance = 0;
        }

        start_point.style.setProperty('offset-distance', path_distance + '%');
        path.style.setProperty('stroke-dashoffset', svg_path_distance);

        if (path_distance == 100 && svg_path_distance == 0) {
          $('.path_shadow').addClass('active');
          $('.point_line').addClass('active');
        } else {
          $('.path_shadow').removeClass('active');
          $('.point_line').removeClass('active');
        }
      }
    });
  }

  $('body').on('click', '.mob-menu a, .menu a', function (e) {
    e.preventDefault();
    var selector = $(this).attr('href');
    console.log(selector);
    var h = $(selector);
    /* jquery-элемент заголовка */

    $('html, body').animate({
      scrollTop: h.offset().top - 70
    }, 400);

    if ($(window).width() < 992) {
      hamburger.toggleClass("is-active");
      body.toggleClass('menu-open');
      $('.mob-menu').slideToggle();
    }
  });

  if ($('.map').length > 0) {
    var mapPoints_array = $.makeArray($('.map__point'));
    setInterval(function () {
      var point = mapPoints_array[Math.floor(Math.random() * mapPoints_array.length)];
      point.classList.add('active');
      setTimeout(function () {
        point.classList.remove('active');
      }, 2000);
    }, 5000);
  }

  $('form input[type="submit"]').on('click', function (e) {
    e.preventDefault();
    var formID = $(this).parents('form').attr('id');
    var formNm = $('#' + formID);
    var inputs = $(this).parents('form').find('input[required]');
    var error = 0;
    inputs.each(function () {
      if ($(this).is(':invalid')) {
        $(this).addClass('invalid');
        error++;
      }
    });

    if (!error) {
      var fd = new FormData(formNm[0]);
      console.log(fd);
      $.ajax({
        type: "POST",
        url: 'mail.php',
        data: fd,
        processData: false,
        contentType: false,
        success: function success(data) {
          document.forms[formID].reset();
          $('#' + formID + ' input[type="submit"]').addClass('success').attr('value', 'Success');
        },
        error: function error(jqXHR, text, _error) {
          alert(formNm.html(_error));
        }
      });
    }
  }); //Scroll animation function

  var scrollElements = document.querySelectorAll(".js-scroll");

  var elementInView = function elementInView(el) {
    var dividend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };

  var elementOutofView = function elementOutofView(el) {
    var elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
  };

  var displayScrollElement = function displayScrollElement(element) {
    element.classList.add("scrolled");
  };

  var hideScrollElement = function hideScrollElement(element) {
    element.classList.remove("scrolled");
  };

  var handleScrollAnimation = function handleScrollAnimation() {
    scrollElements.forEach(function (el) {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", function () {
    handleScrollAnimation();
  });
});