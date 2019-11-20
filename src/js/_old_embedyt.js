/* Light YouTube Embeds by @labnol */
   /* Web: http://labnol.org/?p=27941 */

var embedyt = {
  yt : {
    thumb : '<img src="https://i.ytimg.com/vi/ID/maxresdefault.jpg"/>',
    vid : 'https://www.youtube.com/embed/ID?autoplay=1'
  },
  vimeo : {
    thumb : '<img/>',
    vid : 'https://player.vimeo.com/video/ID?autoplay=1',
    ajax : 'https://vimeo.com/api/v2/video/ID.json'
  }
}


var initEmbedyt = function() {

   var videos = $('.embedyt.init');

   for (var i = 0; i < videos.length; i++) {
       var div = document.createElement('div');
       var elem = $(videos[i]);
       var id = videos[i].dataset.id;
       var vsrc = videos[i].dataset.vsrc;

       $(div).html(createThumb(id, vsrc));
       $(div).click(replaceWithFrame);

       $(elem).removeClass('init');
       $(elem).append(div);
   }
}

var createThumb = function (id, vsrc) {

  if (vsrc == 'vimeo') { vimeoThumb(id); }

  var thumb = embedyt[vsrc].thumb;
  var icon = '<i class="fa fa-play play"></i>';

  return thumb.replace('ID', id) + icon;
}

var vimeoThumb = function (id) {

  $.ajax({
    url: embedyt.vimeo.ajax.replace('ID', id),
    cache: false,
    success: onSuccess
  });

  function onSuccess (data) {
    var selector = "[data-id='ID']";
    var div = $(selector.replace('ID', id));
    var img = $(div).find('img')[0];
    $(img).attr('src', data[0].thumbnail_large);
  }
}

var replaceWithFrame = function () {
  var frame = document.createElement('iframe');
  var data = $(this).parent()[0].dataset;
  var url = embedyt[data.vsrc].vid;

  $(frame).attr('src', url.replace('ID', data.id));
  $(frame).attr('frameborder', '0');
  $(frame).attr('allowfullscreen', '1');
  $(this).replaceWith(frame);
}
