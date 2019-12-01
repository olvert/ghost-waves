// @ts-ignore
import InfinteScroll from 'infinite-scroll';

export default class InfiniteScrollSingleton {
  private readonly selectors = {
    container: '#wrapper',
    path: '#next',
    append: '.post',
  }

  public readonly events = {
    append: 'append',
  }

  private static instance: InfiniteScrollSingleton;

  private infinteScroll: any;

  private constructor() {
    const elem = document.querySelector(this.selectors.container) as HTMLDivElement;

    this.infinteScroll = new InfinteScroll(
      elem,
      {
        path: this.selectors.path,
        append: this.selectors.append,
        history: false,
      },
    );
  }

  static getInstance(): InfiniteScrollSingleton {
    if (!InfiniteScrollSingleton.instance) {
      InfiniteScrollSingleton.instance = new InfiniteScrollSingleton();
    }

    return InfiniteScrollSingleton.instance;
  }

  public bindEvent(event: string, callback: Function): void {
    this.infinteScroll.on(event, callback);
  }
}
