/**
 * Main JS file for Readable behaviours
 */

var myScroll;
var maxPages;
var page;
var url;

function loaded(pages) {
  setMaxPages(pages);
  initValues();
  initMyScroll();
}

function initValues() {
  url = window.location;
  page = 2;
}

function initMyScroll() {
  myScroll = new IScroll('#wrapper', {
    mouseWheel: true,
    infiniteElements: '#scroller .post-body',
    //infiniteLimit: 2000,
    dataset: requestData,
    dataFiller: updateContent,
    cacheSize: 2
  });
}

function setMaxPages(string) {
  maxPages = parseInt(string);
}

function requestData(start, count) {
  console.log('start', start);
  console.log('count', count);
  if (page <= maxPages) {
    getData(start, page);
    page++;
  }
}

function getData(start, page) {
  var www = url + 'page/' + page
  $.get(www, function(html) {
    var wrapper = $(html).find('#wrapper')[0];
    var posts = $(wrapper).children();
    myScroll.updateCache(start, posts);
  });
}

function updateContent(el, data) {
  console.log('el', el);
  console.log('data', data);
  myScroll.refresh();
  //el.innerHTML = data;
  //$('#wrapper').append($(posts).html());
}

function test(s) {
  console.log(s);
}
