# Olmn
A minimalist theme for [Ghost](http://github.com/tryghost/ghost/).

Developed to display media content like YouTube-videos and images. Adding different content might look weird.

Running live at [Waves](http://waves.olle.io) and [Pics](http://pics.olle.io).

## Setup & configuration

* Install theme as usual
* Make a post into a static page with the Post URL 'tags' (*<your-blog-url>/tags/*) to make the tags page work.
* If you want to display the title along with the tags in the lower left corner of a post, add the internal tag '#show_title'.
* Using the current Ghost version (0.11.3) you need to enable the Public API and Internal Tags as beta features to make the theme work correctly.

## Embedding videos
To avoid the explosion of ajax-requests from multiple iframes, this theme offers a different way of embedding videos. For example, to embed a YouTube-video, add the following snippet:

~~~~
<div class="embedyt init" data-id="<YouTube-video-id>" data-vsrc="yt"></div>
~~~~

At the moment, Vimeo is supported as well, just change 'yt' to 'vimeo' and add the Vimeo video id.

By doing this, the theme will only load and display the thumbnail of the video until the video is clicked. Once clicked, the thumbnail image will replaced with the regular iframe. This gives a huge performance increase in loading time compared to pasting iframes into posts directly.

## Credits
Initially forked from [Readable](https://github.com/johelaq/readable) theme by Johel Alvarez. However, basically nothing remains from the original theme.

## Copyright & License

Copyright (c) 2016 Olle Svensson - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
