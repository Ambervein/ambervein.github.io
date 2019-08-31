var $headline = $('.headline'),
    $inner = $('.inner'),
    $nav = $('nav'),
    $nav_tab = $('.nav_tab'),
    $phone = $('.nav_tab_phone'),
    $login = $('.button'),
    $open = $('.button_open'),
    $drop = $('.dropdown-content'),
    $link = $('.dorp-link'),
    $logo = $('.logo'),
    $responsive = $('.menu_responsive'),
    $reg = $('.button_reg'),
    $icon = $('.icon'),
    $active = $('.active'),
    navHeight = 75;

$(window).scroll(function() {
  var scrollTop = $(this).scrollTop(),
      headlineHeight = $headline.outerHeight() - navHeight,
      navOffset = $nav.offset().top;

  $headline.css({
    'opacity': (1 - scrollTop / headlineHeight)
  });
  $inner.children().css({
    'transform': 'translateY('+ scrollTop * 0.4 +'px)'
  });
  if (navOffset > headlineHeight) {
    $nav.addClass('scrolled');
    $nav_tab.addClass('alt');
    $phone.addClass('alt_phone');
    $login.addClass('button_login_alt');
    $drop.addClass('dropdown_alt');
    $link.addClass('dorp-link-alt');
    $logo.addClass('logo-alt');
    $responsive.addClass('menu_responsive_alt');
    $reg.addClass('button_reg_alt');
    $icon.addClass('icon_alt');
    $active.addClass('active_alt');
  } else {
    $nav.removeClass('scrolled');
    $nav_tab.removeClass('alt');
    $phone.removeClass('alt_phone');
    $login.removeClass('button_login_alt');
    $drop.removeClass('dropdown_alt');
    $link.removeClass('dorp-link-alt');
    $logo.removeClass('logo-alt');
    $responsive.removeClass('menu_responsive_alt');
    $reg.removeClass('button_reg_alt');
    $icon.removeClass('icon_alt');
    $active.removeClass('active_alt');
  }

  if (navOffset > 150) {$open.addClass('disappear');} else { $open.removeClass('disappear');}
});