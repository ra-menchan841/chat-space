$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="main-message-list__message">
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
        `<div class="main-message-list__message">
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
    });
  });
});