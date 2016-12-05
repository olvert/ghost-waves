/**
 * Main JS file for Readable behaviours
 */

var loading = '<p>Loading...</p>'
var finished = '<p>The End.</p>'
var isFinished = false

var init = function () {
  $('#wrapper').infinitescroll({
    navSelector  : '#nav',
    nextSelector : '#next',
    itemSelector : '#wrapper div.post-body',
    loading: {
      finished : appendFinished,
      finishedMsg : null,
      msg : null,
      msgText : loading,
      selector : '#info-loading'
    },
    bufferPx : 200
  });
}

appendFinished = function () {

  // Infinite scroll sometimes reaches finished twice
  if (isFinished) { return; }

  isFinished = true;
  $('#info-loading').append(finished);
}
