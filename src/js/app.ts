import Embedyt from './embedyt';
import ImagesLoaded from './images-loaded';
import InfiniteScrollSingleton from './infinite-scroll-singleton';
import MasonrySingleton from './masonry-singleton';

const initInfiniteScroll = (): void => {
  const scrollSingleton: InfiniteScrollSingleton = InfiniteScrollSingleton.getInstance();
  scrollSingleton.bindEvent(scrollSingleton.events.append, () => {
    Embedyt.init();
    ImagesLoaded.init();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  MasonrySingleton.getInstance();
  Embedyt.init();
  ImagesLoaded.init();

  if (InfiniteScrollSingleton.isApplicable()) {
    initInfiniteScroll();
  }
});
