/* https://www.labnol.org/internet/light-youtube-embeds/27941/ */

import { sprintf } from 'sprintf-js';

export default abstract class Embedyt {
  private static readonly classes = {
    embedyt: 'embedyt',
    init: 'init',
    thumbnailWrapper: 'embedyt-thumb-wrapper',
    thumbnail: 'embedyt-thumb',
    playIcon: 'play-icon',
    noFade: 'no-fade',
  }

  private static readonly iconUrl = '/assets/icons/play-solid.svg';

  private static readonly youtube = {
    attribute: 'yt',
    embedUrl: 'https://www.youtube.com/embed/%s?autoplay=1',
    thumbnailUrl: 'https://i.ytimg.com/vi/%s/maxresdefault.jpg',
  }

  private static readonly vimeo = {
    attribute: 'vimeo',
    embedUrl: 'https://player.vimeo.com/video/%s?autoplay=1',
    jsonUrl: 'https://vimeo.com/api/v2/video/%s.json',
    thumbnailKey: 'thumbnail_large',
  }

  private static getUninitializedElems(): Array<HTMLDivElement> {
    const selector: string = `.${this.classes.embedyt}.${this.classes.init}`;
    return [].slice.call(document.querySelectorAll(selector));
  }

  private static getThumbnailImgElement(): HTMLImageElement {
    const img = document.createElement('img');
    img.classList.add(this.classes.thumbnail);

    return img;
  }

  private static getYoutubeThumbnail(id: string): HTMLImageElement {
    const img: HTMLImageElement = this.getThumbnailImgElement();
    img.src = sprintf(this.youtube.thumbnailUrl, id);
    return img;
  }

  private static getVimeoThumbnail(id: string): HTMLImageElement {
    const img: HTMLImageElement = this.getThumbnailImgElement();
    const url: string = sprintf(this.vimeo.jsonUrl, id);

    const handleResponse = async (response: Response): Promise<any> => {
      if (!response.ok) { throw new Error(`Vimeo thumbnail fetch failed, status: ${response.status}`); }

      const json = await response.json();
      const thumbnailUrl = json[0][this.vimeo.thumbnailKey];

      img.src = thumbnailUrl;

      return thumbnailUrl;
    };

    fetch(url).then(handleResponse);

    return img;
  }

  private static getThumbnailElement(id: string = '', vsrc: string = ''): HTMLImageElement {
    switch (vsrc) {
      case this.youtube.attribute:
        return this.getYoutubeThumbnail(id);

      case this.vimeo.attribute:
        return this.getVimeoThumbnail(id);

      default:
        return this.getYoutubeThumbnail(id);
    }
  }

  private static getEmbedUrl(id: string = '', vsrc: string = ''): string {
    switch (vsrc) {
      case this.youtube.attribute:
        return sprintf(this.youtube.embedUrl, id);

      case this.vimeo.attribute:
        return sprintf(this.vimeo.embedUrl, id);

      default:
        return sprintf(this.youtube.embedUrl, id);
    }
  }

  private static getFrameElement(id: string = '', vsrc: string = ''): HTMLIFrameElement {
    const frame: HTMLIFrameElement = document.createElement('iframe');
    const embedUrl: string = this.getEmbedUrl(id, vsrc);

    frame.src = embedUrl;
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allowfullscreen', '1');

    return frame;
  }

  private static replaceWithFrame(event: MouseEvent): void {
    const selector: string = `.${this.classes.embedyt}`;
    const targetElem: HTMLImageElement = event.target as HTMLImageElement;
    const parentElem: HTMLDivElement = targetElem.closest(selector) as HTMLDivElement;
    const { id, vsrc } = parentElem.dataset;

    const frameElem: HTMLIFrameElement = this.getFrameElement(id, vsrc);

    targetElem.replaceWith(frameElem);
  }

  private static getPlayIcon(): HTMLDivElement {
    const img: HTMLImageElement = document.createElement('img');
    const div: HTMLDivElement = document.createElement('div');

    img.src = this.iconUrl;
    img.classList.add(this.classes.noFade);

    div.classList.add(this.classes.playIcon);
    div.append(img);

    return div;
  }

  private static initElem(videoElem: HTMLDivElement): void {
    const { id, vsrc } = videoElem.dataset;
    const div: HTMLDivElement = document.createElement('div');
    const thumbnail: HTMLImageElement = this.getThumbnailElement(id, vsrc);
    const playIcon: HTMLDivElement = this.getPlayIcon();

    div.classList.add(this.classes.thumbnailWrapper);

    div.append(playIcon);
    div.append(thumbnail);
    videoElem.append(div);
    videoElem.addEventListener('click', (e) => this.replaceWithFrame(e));
  }

  public static init(): void {
    Embedyt.getUninitializedElems().map((e: HTMLDivElement) => Embedyt.initElem(e));
  }
}
