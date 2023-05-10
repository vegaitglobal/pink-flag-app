import { Image } from './Shared';

export interface BlogModel {
  id: number;
  meta: BlogModelMeta;
  title: string;
  image: Image;
  category: BlogType;
}

export interface BlogModelMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  first_published_at: string;
}

export type BlogType = 'BLOG' | 'VESTI';
