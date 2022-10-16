/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { BlogCard } from './utils/styles';
import { Image, View, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';
import { AppTheme } from '@pf/theme';
import { useGetFeaturedBlogQuery } from '@pf/services';
import { BASE_URI } from '../../services/rootApi';
import { ActivityIndicatorContainer } from '@pf/components';

export const BlogModule: React.FC = () => {
  const { data, isLoading } = useGetFeaturedBlogQuery();

  return isLoading ? (
    <ActivityIndicatorContainer />
  ) : data && data.meta.total_count > 0 ? (
    <BlogCard style={styles.BlogCardStyle}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={{ uri: BASE_URI + data.items[0].image.meta.download_url }}
        />
        <View style={styles.cardBody}>
          <CustomText style={styles.label}>{data.items[0].meta.type}</CustomText>
          <CustomText style={styles.date}>{new Date(data.items[0].meta.first_published_at).toDateString()}</CustomText>
          <CustomText style={styles.titleText}>{data.items[0].title}</CustomText>
        </View>
      </View>
    </BlogCard>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  BlogCardStyle: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: AppTheme.colors.white,
  },
  cardBody: {
    padding: 10,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 10,
    borderRadius: 5,
    letterSpacing: 1,
    marginBottom: 5,
    textTransform: 'uppercase',
    color: AppTheme.colors.white,
    fontSize: AppTheme.fontSize.$1Number,
    backgroundColor: AppTheme.colors.label,
    alignSelf: 'flex-start',
  },
  date: {
    fontSize: AppTheme.fontSize.$2Number,
    marginBottom: 10,
    color: AppTheme.colors.description,
  },
  titleText: {
    color: AppTheme.colors.primary,
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '500',
  },
});
