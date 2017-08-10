// Add animation / inialize wow
$(document).ready(function(){
  'use strict';
  new WOW().init();
});

// Car move right animation
$("div.gray").hover(function(){
  $("div.lambo").stop(true, false).animate({
    marginLeft: "85%"
  });

  $("#register").stop(true, false).animate({
   'text-indent': "30%"
  });
}, function(){
  $("div.lambo").stop(true, false).animate({
    marginLeft: "0px"
  });

  $("#register").stop(true, false).animate({
    'text-indent': "-200px"
  });
});
