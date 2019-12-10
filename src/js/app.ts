import Embedyt from './embedyt';
import ImagesLoaded from './images-loaded';
import InfiniteScrollSingleton from './infinite-scroll-singleton';

const initInfiniteScroll = (): void => {
  const scrollSingleton: InfiniteScrollSingleton = InfiniteScrollSingleton.getInstance();
  scrollSingleton.bindEvent(scrollSingleton.events.append, () => {
    Embedyt.init();
    ImagesLoaded.init();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  Embedyt.init();
  ImagesLoaded.init();

  if (InfiniteScrollSingleton.isApplicable()) {
    initInfiniteScroll();
  }
});
