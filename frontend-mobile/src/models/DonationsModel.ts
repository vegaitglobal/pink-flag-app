import { Image } from '.';

export type DonationsModel = {
  title: string;
  body: string;
  image: Image;
  copy_text: string;
};

export type DonationBannerModel = {
  title: string;
  description: string;
  button_text: string;
};
