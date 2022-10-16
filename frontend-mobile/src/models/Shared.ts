export interface Body {
  type: string;
  value: string;
  id: string;
}

export interface Image {
  id: number;
  meta: ImageMeta;
  title: string;
}

export interface ImageMeta {
  type: string;
  detail_url: string;
  download_url: string;
}

export interface Parent {
  id: number;
  meta: ParentMeta;
  title: string;
}

export interface ParentMeta {
  type: string;
  detail_url: string;
  html_url: string;
}
