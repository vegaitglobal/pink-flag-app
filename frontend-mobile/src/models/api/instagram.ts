export type InstagramFeedResponse = {
  data: {
    user: {
      edge_owner_to_timeline_media: {
        edges: [
          {
            node: {
              thumbnail_src: string;
            };
          },
        ];
      };
    };
  };
};
