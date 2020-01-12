// @ts-ignore
import InfinteScroll from 'infinite-scroll';

import MasonrySingleton from './masonry-singleton';
import Embedyt from './embedyt';
import ImagesLoaded from './images-loaded';

export default class InfiniteScrollSingleton {
  private static readonly selectors = {
    container: '#wrapper',
    path: '#next',
    append: '.post',
    loadingInfo: '#loading-info',
  }

  private readonly classes = {
    loading: 'loading',
  }

  public readonly events = {
    append: 'append',
    request: 'request',
    load: 'load',
  }

  private static instance: InfiniteScrollSingleton;

  private infinteScroll: any;

  private loadingInfo: HTMLDivElement;

  private constructor() {
    const iis = InfiniteScrollSingleton;
    const container = document.querySelector(iis.selectors.container) as HTMLDivElement;
    const loadingInfo = document.querySelector(iis.selectors.loadingInfo) as HTMLDivElement;

    this.loadingInfo = loadingInfo;
    this.infinteScroll = new InfinteScroll(
      container,
      {
        path: iis.selectors.path,
        // append: iis.selectors.append,
        history: false,
      },
    );

    this.bindInternalEvents();
  }

  private bindInternalEvents(): void {
    this.bindEvent(this.events.request, () => {
      this.loadingInfo.classList.add(this.classes.loading);
    });

    this.bindEvent(this.events.load, () => {
      this.loadingInfo.classList.remove(this.classes.loading);
    });

    this.bindEvent(this.events.load, (response: HTMLDocument, path: any) => {
      // console.log('loaded page', response, path);
      const posts = [].slice.call(response.querySelectorAll('.post'));
      const container = document.querySelector('#wrapper') as HTMLDivElement;
      const { masonry } = MasonrySingleton.getInstance();

      if (masonry.appended) {
        posts.map((p) => container.appendChild(p));
        masonry.appended(posts);
        console.log('adding items', posts);

        Embedyt.init();
        ImagesLoaded.init();
      }
    });
  }

  public static getInstance(): InfiniteScrollSingleton {
    if (!InfiniteScrollSingleton.instance) {
      InfiniteScrollSingleton.instance = new InfiniteScrollSingleton();
    }

    return InfiniteScrollSingleton.instance;
  }

  public static isApplicable(): boolean {
    const iis = InfiniteScrollSingleton;
    const nextLink = document.querySelector(iis.selectors.path);

    return nextLink != null;
  }

  public bindEvent(event: string, callback: Function): void {
    this.infinteScroll.on(event, callback);
  }
}
