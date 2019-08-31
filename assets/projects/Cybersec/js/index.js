var $headline = $('.particles-js'),
    $inner = $('.inner'),
    $nav = $('nav'),
    $logo = $('.logo'),
    $nav_tab = $('.nav_tab'),
    navHeight = 75;

$(window).scroll(function() {
  var scrollTop = $(this).scrollTop(),
      headlineHeight = $headline.outerHeight() - navHeight,
      navOffset = $nav.offset().top;

  
  if (navOffset > headlineHeight) {
    $nav.addClass('scrolled');
    $nav_tab.addClass('alt');
    $logo.addClass('logo-alt');
    $responsive.addClass('menu_responsive_alt');
  } else {
    $nav.removeClass('scrolled');
    $nav_tab.removeClass('alt');
    $logo.removeClass('logo-alt');
    $responsive.removeClass('menu_responsive_alt');
  }

});



