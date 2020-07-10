$(function(){

  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="main-message-list__message" data-message-id=${message.id}>
          <ul class="main-message-list__message__user-name">
            <li class="user-name">
            ${message.user_name}
            </li>
            <li class="day">
            ${message.created_at}
            </li>
          </ul>
          <div class="main-message-list__message__sentence">
            <div>
            ${message.body}
            </div>
          </div>
          <div class="main-message-list__message__image">
          <img src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-message-list__message" data-message-id=${message.id}>
          <ul class="main-message-list__message__user-name">
            <li class="user-name">
            ${message.user_name}
            </li>
            <li class="day">
            ${message.created_at}
            </li>
          </ul>
          <div class="main-message-list__message__sentence">
            <div>
            ${message.body}
            </div>
          </div>
        </div>`
      return html;
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-message-list').append(html);
        $('.main-message-list').animate({ scrollTop: $('.main-message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('.main-form__box__send').prop("disabled", false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $('.main-form__box__send').prop("disabled", false);
      });
  });

  var reloadMessages = function() {
    var last_message_id = $('.main-message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-message-list').append(insertHTML);
        $('.main-message-list').animate({ scrollTop: $('.main-message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

