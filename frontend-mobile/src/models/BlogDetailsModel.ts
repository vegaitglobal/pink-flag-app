import { Image, Parent } from '.';

export interface BlogDetailsModel {
  id: number;
  meta: BlogDetailsModelMeta;
  title: string;
  body: Body[];
  category: string;
  image: Image;
}

export interface BlogDetailsModelMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string;
  parent: Parent;
}
