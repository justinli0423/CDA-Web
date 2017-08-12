//getting JSON from database and appending to QnA
$(function(){
  var $comments = $('#comments');
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/comments',
    success: function(comments){
        $.each(comments.students, function(i, comment){
          $comments.append('<li class = "text comment"><img class = "profile-pic" src = "/images/lambo.png" />' + '<span class = "text question-name">' + comment.name + '</span>' + ': <br />' + comment.comment + '</li>');
        });
    }
  })
});
