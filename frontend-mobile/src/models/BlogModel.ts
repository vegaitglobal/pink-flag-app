import { Image } from './Shared';

export interface BlogModel {
  id: number;
  meta: BlogModelMeta;
  title: string;
  image: Image;
  category: 'BLOG' | 'VESTI';
}

export interface BlogModelMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  first_published_at: string;
}
