import imagesLoaded from 'imagesloaded';

import MasonrySingleton from './masonry-singleton';

export default abstract class ImagesLoaded {
  private static readonly classes = {
    selector: '#wrapper',
    loaded: 'loaded',
  };

  private static setImageAsLoaded(image: HTMLImageElement): void {
    image.classList.add(this.classes.loaded);
  }

  public static init(): void {
    const elem = document.querySelector(this.classes.selector) as HTMLElement;
    const imgLoad = imagesLoaded(elem);

    imgLoad.on('always', (instance) => {
      instance.images.map((image) => this.setImageAsLoaded(image.img));

      const { masonry } = MasonrySingleton.getInstance();
      if (masonry && masonry.layout) {
        masonry.layout();
        console.log('Running layout');
      }
    });

    imgLoad.on('progress', (instance, image) => {
      if (image) {
        this.setImageAsLoaded(image.img);
      }
    });
  }
}
