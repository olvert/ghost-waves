import Embedyt from './embedyt';
import InfiniteScrollSingleton from './infinite-scroll-singleton';

window.addEventListener('DOMContentLoaded', () => {
  Embedyt.init();

  const scrollSingleton: InfiniteScrollSingleton = InfiniteScrollSingleton.getInstance();
  scrollSingleton.bindEvent(scrollSingleton.events.append, Embedyt.init);
});
