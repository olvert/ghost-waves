import Masonry from 'masonry-layout';

export default class MasonrySingleton {
  private static instance: MasonrySingleton;

  public masonry: Masonry;

  private constructor() {
    const wrapper = document.querySelector('#wrapper') as HTMLDivElement;
    this.masonry = new Masonry(wrapper, {
      itemSelector: '.post',
      percentPosition: true,
      horizontalOrder: true,
    });
  }

  public static getInstance(): MasonrySingleton {
    if (!MasonrySingleton.instance) {
      MasonrySingleton.instance = new MasonrySingleton();
    }

    return MasonrySingleton.instance;
  }
}
