/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTheme } from '@emotion/react';
import { FacebookWhiteSvg, InstagramWhiteSvg } from '@pf/assets';
import { useGetFooterQuery } from '@pf/services';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, ImageBackground, Image, Pressable, Linking } from 'react-native';
import { ActivityIndicatorContainer } from '@pf/components';
import { CustomText } from '../CustomText';
import { FooterModel } from '@pf/models';

export const Footer: React.FC = () => {
  const { data, error, isLoading } = useGetFooterQuery<FooterModel>();
  const theme = useTheme();
  const IconInstagram = InstagramWhiteSvg;
  const IconFacebook = FacebookWhiteSvg;

  const styles = useMemo(() => {
    return StyleSheet.create({
      baseText: {
        fontWeight: 'bold',
        fontSize: theme.fontSize.$8Number,
        color: 'white',
        marginBottom: 10,
      },
      innerText: {
        color: 'white',
        marginRight: 103,
        lineHeight: 22,
        marginBottom: 20,
      },
      container: {
        height: 400,
        padding: theme.spacing.$1Number,
      },
      viewContainer: {
        marginTop: theme.spacing.$1Number,
      },
    });
  }, [theme]);

  return isLoading ? (
    <ActivityIndicatorContainer />
  ) : data ? (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <ImageBackground style={styles.container} resizeMode="cover" source={require('../../assets/images/footer.png')}>
      <View style={styles.viewContainer}>
        <CustomText style={styles.baseText}>{data.title}</CustomText>
        <View style={{ marginTop: theme.spacing.$1Number, flexDirection: 'row' }}>
          <View>
            {data.location && data.location.length > 0 && (
              <>
                <Image source={require('../../assets/icons/location.svg')} />
                <CustomText style={styles.innerText}>{data.location}</CustomText>
              </>
            )}
            {data.email && data.email.length > 0 && (
              <Pressable
                onPress={() => {
                  Linking.canOpenURL(data.email).then(() => {
                    Linking.openURL('mailto:' + data.email);
                  });
                }}>
                <Image source={require('../../assets/icons/mail.svg')} />
                <CustomText style={styles.innerText}>{data.email}</CustomText>
              </Pressable>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {data.instagram_profile_url && data.instagram_profile_url.length > 0 && (
              <Pressable
                onPress={() => {
                  Linking.canOpenURL(data.instagram_profile_url).then(() => {
                    Linking.openURL(data.instagram_profile_url);
                  });
                }}>
                <IconInstagram style={{ marginRight: theme.spacing.$1Number }} />
              </Pressable>
            )}
            {data.facebook_profile_url && data.facebook_profile_url.length > 0 && (
              <Pressable
                onPress={() => {
                  Linking.canOpenURL(data.facebook_profile_url).then(() => {
                    Linking.openURL(data.facebook_profile_url);
                  });
                }}>
                <IconFacebook />
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <CustomText style={{ textAlign: 'center', marginTop: theme.spacing.$1Number, color: 'white' }}>
          {data.copyright}
        </CustomText>
      </View>
    </ImageBackground>
  ) : null;
};
