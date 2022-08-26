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
  $('body').on('click', '.mob-menu a, .header__menu a', function (e) {
    e.preventDefault();
    var selector = $(this).attr('href');
    /* #about - строка */

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
  var mapPoint_array = $.makeArray($('.map_point'));
  setInterval(function () {
    var item = mapPoint_array[Math.floor(Math.random() * mapPoint_array.length)];
    item.classList.add('active');
    setTimeout(function () {
      item.classList.remove('active');
    }, 2000);
  }, 5000);
  $('form input[type="submit"]').on('click', function (e) {
    e.preventDefault();
    var formID = $(this).parents('form').attr('id');
    var formNm = $('#' + formID);
    console.log(formNm);
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
      $.ajax({
        type: "POST",
        url: '/Choicie/mail.php',
        data: fd,
        processData: false,
        contentType: false,
        success: function success(data) {
          document.forms[formID].reset();
          $('#' + formID + ' input[type="submit"]').addClass('success').attr('value', 'Success');
        },
        error: function error(jqXHR, text, _error) {
          alert($(formNm).html(_error));
        }
      });
    }
  });

  if ($(window).width() > 767) {
    AOS.init({
      once: true // whether animation should happen only once - while scrolling down

    });
  }
});