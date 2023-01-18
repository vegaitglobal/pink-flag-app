import React from 'react';
import { DonateBanner, Footer } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { BlogRoutes } from '@pf/constants';
import { useGetBlogByIdQuery } from '@pf/services';
import { ActivityIndicator, Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { AppTheme } from '@pf/theme';
import { CustomText } from '../../components/CustomText';
import { useTheme } from '@emotion/react';
import { BASE_URI } from '../../services/rootApi';
import RenderHtml from 'react-native-render-html';
import { HomeScreenProps } from '../../navigation/HomeNavigator';

const { BLOG_DETAILS } = BlogRoutes;

export const BlogDetailsScreen: React.FC<HomeScreenProps<typeof BLOG_DETAILS>> = ({ route }) => {
  const { data, isLoading } = useGetBlogByIdQuery(route.params.id);
  const theme = useTheme();
  const { width } = useWindowDimensions();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data && (
        <View style={{ padding: theme.spacing.$1Number }}>
          <CustomText style={styles.label}>{data?.meta.type}</CustomText>
          <CustomText style={styles.date}>{new Date(data.meta.first_published_at).toDateString()}</CustomText>
          <CustomText style={styles.titleText}>{data?.title}</CustomText>
          <Image
            style={styles.cardImage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={{ uri: BASE_URI + (data?.image?.meta?.download_url ?? '') }}
          />

          {data.body.map((bodyItem, index) => {
            if (bodyItem.type == 'paragraph') {
              return (
                <RenderHtml
                  key={index}
                  baseStyle={{ color: 'black' }}
                  contentWidth={width}
                  source={{ html: bodyItem.value }}
                />
              );
            }
            if (bodyItem.type == 'image' && bodyItem.value && bodyItem.value.length > 10) {
              return (
                <Image
                  key={index}
                  style={styles.cardImage}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  source={{ uri: BASE_URI + String(bodyItem.value) }}
                />
              );
            }
            return null;
          })}
        </View>
      )}

      <DonateBanner title="Doniraj" description="Podrzi akciju i DONIRAJ" buttonTitle="Doniraj" />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
});
