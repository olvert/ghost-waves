import Embedyt from './embedyt';
import ImagesLoaded from './images-loaded';
import InfiniteScrollSingleton from './infinite-scroll-singleton';

window.addEventListener('DOMContentLoaded', () => {
  Embedyt.init();
  ImagesLoaded.init();

  const scrollSingleton: InfiniteScrollSingleton = InfiniteScrollSingleton.getInstance();
  scrollSingleton.bindEvent(scrollSingleton.events.append, () => {
    Embedyt.init();
    ImagesLoaded.init();
  });
});
