// Add animation / inialize wow
$(document).ready(function(){
  'use strict';
  new WOW().init();
});

// Car move right animation
$("div.lambo").hover(function(){
  $(this).stop(true,false).animate({
    marginLeft: "300px"
  });
}, function(){
  $(this).stop(true,false).animate({
    marginLeft: "0px"
  });
});
