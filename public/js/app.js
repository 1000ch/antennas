$(function () {
  $.ajax({
    url: '/api/data'
  }).done(function (data) {
    var html = '';
    data.forEach(function (item) {
      html +=
        '<li>' +
        '<a href="' + item.link + '">' + item.title + '</a>' +
        '</li>';
    });
    $('ul').html(html);
  }).fail(function (error) {
    console.log(error);
  });
});
