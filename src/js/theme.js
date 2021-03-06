// TOC sidebar - add "active" class to parent list
//
// Bootstrap's scrollspy adds the active class to the <a> link,
// but for the automatic collapsing we need this on the parent list item.
//
// The event is triggered on "window" (and not the nav item as documented),
// see https://github.com/twbs/bootstrap/issues/20086
$(window).on('activate.bs.scrollspy', function() {
  var navLinks = document.querySelectorAll('#bd-toc-nav a');
  for (var i = 0; i < navLinks.length; i++) {
    var navLink = navLinks[i];
    navLink.parentElement.classList.remove('active');
  }
  var navLinks = document.querySelectorAll('#bd-toc-nav a.active');
  for (var i = 0; i < navLinks.length; i++) {
    var navLink = navLinks[i];
    navLink.parentElement.classList.add('active');
  }
});

/**
 * Use left and right arrow keys to navigate forward and backwards.
 */
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;

const getPrevUrl = () => document.getElementById('prev-link').href;
const getNextUrl = () => document.getElementById('next-link').href;
const initPageNav = event => {
  const keycode = event.which;

  if (keycode === LEFT_ARROW_KEYCODE) {
    window.location.href = getPrevUrl();
  } else if (keycode === RIGHT_ARROW_KEYCODE) {
    window.location.href = getNextUrl();
  }
};

var keyboardListener = false;
$(document).ready(() => {
  if (keyboardListener === false) {
    document.addEventListener('keydown', initPageNav);
    keyboardListener = true;
  }
  var select_options = $('#small-dropdown option');
  var current_page = window.location.pathname.replace("/", "") + window.location.search;
  var selection_length = select_options.filter(`[value="${current_page}"]`).length;
  var empty_selection_length = select_options.filter('[value=""]').length;
  if(select_options.length && (selection_length || empty_selection_length)) {
    select_options.removeAttr('selected').filter('[value=""]').attr('selected', true);
  } else {
    $('#small-dropdown').hide();
    $('#topics-header').hide();
  }
});

// Based on https://stackoverflow.com/a/37796085
$('#small-dropdown').click(function() {
  var open = $(this).data('isopen');
  if(open && $(this).val()) {
    window.location.href = $(this).val();
  }
  //Set 'isopen' to the opposite so next time when select box is clicked
  //it won't trigger the redirection to a new page
  $(this).data('isopen', !open);
});