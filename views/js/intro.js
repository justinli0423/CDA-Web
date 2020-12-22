$(document).ready(function(){
  $('.car').addClass('animate');

  $('.welcome').delay(2500).animate({
    opacity: '1'
  }, {complete: function(){
    $('.to').animate({
      opacity: '1'
    }, {complete: function(){
      $('.cda').animate({
        opacity: '1'
      },{complete: function(){
        $('.languages').animate({
          opacity: '1'
        })
      }});
    }});
  }});
});
