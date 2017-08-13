//getting JSON from database and appending to QnA
$(function(){
  var $comments = $('#comments');
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/comments',
    success: function(comments){
        $.each(comments.students, function(i, comment){
          $comments.append('<li class = "text comment" id = "' + i + '"><img class = "profile-pic" src = "/images/lambo.png" />' +
          '<span class = "text user-name">' + comment.name + '</span>' + '<div class = "text user-question">' +
          comment.comment + '<span><button href = "#" class =" user-question reply text '+ i +'">Reply</button><form method = "post" action = "delete"><button type = "button" action = "submit" class ="user-question delete text '+ i +'">Delete</button></form></span></div>' + '</li>');
        });
    }
  })
});
