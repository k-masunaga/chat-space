$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__message-lists__list" data-message-id= ${message.id}>
          <div class="chat-main__message-lists__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-lists__date">
            ${message.created_at}
          </div>
          <div class="chat-main__message-lists__message">
            <p class="lower-message__content">
              ${message.text}
            </p>
            <p class="lower-message__image">
              <img src=${message.image} >
            </p>
          </div>
        </div>`
      return html;
    } else {
      var html =
      `<div class="chat-main__message-lists__list" data-message-id= ${message.id}>
        <div class="chat-main__message-lists__name">
          ${message.user_name}
        </div>
        <div class="chat-main__message-lists__date">
          ${message.created_at}
        </div>
        <div class="chat-main__message-lists__message">
          <p class="lower-message__content">
            ${message.text}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-lists').append(html);
      $('form')[0].reset();
      $('.chat-main__message-lists').animate({ scrollTop: $('.chat-main__message-lists')[0].scrollHeight});
      $('button').prop('disabled', true);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $(".chat-main__message-form__send-form").removeAttr("disabled");
    });
  })
    var reloadMessages = function() {
      var last_message_id = $('.chat-main__message-lists__list:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages)
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.chat-main__message-lists').append(insertHTML);
          $('.chat-main__message-lists').animate({ scrollTop: $('.chat-main__message-lists')[0].scrollHeight});
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
