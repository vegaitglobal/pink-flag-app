import { InstagramFeed, InstagramFeedResponse } from '@pf/models';

const IMAGE_COUNT = 9;

export const getFeedImages = (response: InstagramFeedResponse): InstagramFeed => {
  const feedImages = response.data.user.edge_owner_to_timeline_media.edges.slice(0, IMAGE_COUNT);
  return feedImages.map(x => ({ thumbnail: x.node.thumbnail_src }));
};
