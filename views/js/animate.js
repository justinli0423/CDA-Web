// Add animation / inialize wow
$(document).ready(function(){
  'use strict';
  new WOW().init();
});

// Car move right animation
$("div.gray").hover(function(){
  $("div.lambo").stop(true, false).animate({
    marginLeft: "30%"
  });

  $("#register").stop(true, false).delay(100).animate({
   'text-indent': "0%",
   'left': "50%"
  });

  $(".register-box").delay(300).animate({
    'borderTopColor': "#e71d26",
    'borderLeftColor': "#e71d26",
    'borderRightColor': "#e71d26",
    'borderBottomColor': "#e71d26"
  });
}, function(){
  $(".register-box").animate({
    'background-color': "transparent",
    'color': "#e71d26"
  }, {
    complete: function(){
    $(".register-box").animate({
      'borderTopColor': "transparent",
      'borderLeftColor': "transparent",
      'borderRightColor': "transparent",
      'borderBottomColor': "transparent"
    },{
      complete: function(){
        $("#register").stop(true, false).animate({
          'text-indent': "-200px"
        },{
          complete: function(){
            $("div.lambo").stop(true, false).animate({
              marginLeft: "0px"
            });
          }});
      }});
  }});

});

$(".register-box").hover(function(){
  $(this).animate({
    'background-color': "#e71d26",
    'color': "white"
  });
}, function(){
  $(this).animate({
    'background-color': "transparent",
    'color': "#e71d26"
  });
});
