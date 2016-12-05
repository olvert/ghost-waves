/**
 * Main JS file for Readable behaviours
 */

var loading = '<p>Loading...</p>'
var finished = '<p>The End.</p>'

var init = function () {
  $('#wrapper').infinitescroll({
    navSelector  : '#nav',
    nextSelector : '#next',
    itemSelector : '#wrapper div.post-body',
    loading: {
      finished : appendEnd,
      finishedMsg : null,
      msg : null,
      msgText : loading,
      selector : '#info-loading' 
    },
    bufferPx : 200
  });
}

appendEnd = function () {
  $('#info-loading').append(finished);
}
