# Ghost Waves
A minimalist theme for [Ghost](http://github.com/tryghost/ghost/).

## Setup & configuration

* Install theme as usual
* Make a post into a static page with the Post URL 'tags' (*<your-blog-url>/tags/*) to make the tags page work.
* If you want to display the title along with the tags in the lower left corner of a post, add the internal tag '#show_title'.

## Embedding videos
To avoid the explosion of ajax-requests from multiple iframes, this theme offers a different way of embedding videos. For example, to embed a YouTube-video, add the following snippet:

~~~~
<div class="embedyt init" data-id="<YouTube-video-id>" data-vsrc="yt"></div>
~~~~

At the moment, Vimeo is supported as well, just change 'yt' to 'vimeo' and add the Vimeo video id.

By doing this, the theme will only load and display the thumbnail of the video until the video is clicked. Once clicked, the thumbnail image will replaced with the regular iframe. This gives a huge performance increase in loading time compared to pasting iframes into posts directly.

## TODO
- Clean up templates / HTML
- Show active page name?
- Show active tag name?
- Filter on tags page?
- Optimize for Lighthouse?