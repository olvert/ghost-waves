/**
 * Main JS file for Readable behaviours
 */

var loading = '<p>Loading...</p>'
var finished = '<p>The End.</p>'
var maxPage = undefined

var init = function () {

  // Dynamic sizing of iframes
  refreshFitVids();

  // Infinite scrolling
  $('#wrapper').infinitescroll({
    navSelector  : '#nav',
    nextSelector : '#next',
    itemSelector : '#wrapper div.post-body',
    loading: {
      finished : undefined,
      finishedMsg : finished,
      msg : null,
      msgText : loading,
      selector : '#info-loading',
    },
    bufferPx : 200,
    maxPage : maxPage
  }, refreshFitVids);

}

var setMaxPage = function (max) {
  maxPage = parseInt(max);
}

var refreshFitVids = function () {
  $('#content').fitVids();
}

// Init everything
$(document).ready(init);
