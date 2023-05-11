/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback } from 'react';
import {
  Container,
  Copyright,
  Detail,
  DetailRow,
  IconsArea,
  Spacing,
  StyledLine,
  StyledLink,
  StyledLocationSvg,
  Title,
} from './styles';
import BackgroundImage from '../../assets/images/footer.png';
import { FacebookSvg, InstagramSvg, LinkTreeSvg, MailSvg, TikTokSvg, TwitterSvg, YouTubeSvg } from '@pf/assets';
import Config from 'react-native-config';
import { Linking, View } from 'react-native';
import { getAddressScheme } from './getAddressScheme';
import { useGetFooterQuery } from '@pf/services';
import { EMPTY_STRING } from '@pf/constants';

const CURRENT_YEAR = new Date().getFullYear();
const HIT_SLOP = { top: 2, left: 10, right: 10, bottom: 10 };

export const Footer: React.FC = ({ ...props }) => {
  const { data } = useGetFooterQuery();
  const address = data?.location || Config.ADDRESS;
  const email = data?.email || Config.EMAIL;
  const instagramUrl = data?.instagram_profile_url || Config.INSTAGRAM_URL;
  const facebookUrl = data?.facebook_profile_url || Config.FACEBOOK_URL;
  const copyRight = data?.copyright || `© ${CURRENT_YEAR} ${Config.APP_NAME || EMPTY_STRING}. All rights reserved.`;

  const handleOnLocationPress = useCallback(() => {
    const addressScheme = getAddressScheme();

    if (!addressScheme) {
      return;
    }

    Linking.openURL(addressScheme);
  }, []);

  const handleOnMailPress = useCallback(() => {
    if (Config.EMAIL) {
      Linking.openURL(`mailto:${Config.EMAIL}`);
    }
  }, []);

  return (
    <View {...props}>
      <Container resizeMode="stretch" source={BackgroundImage}>
        <Title content={data?.title || 'Kontakt'} />
        <IconsArea>
          <StyledLink url={instagramUrl} hitSlop={HIT_SLOP}>
            <InstagramSvg />
          </StyledLink>
          <StyledLink url={facebookUrl}>
            <FacebookSvg />
          </StyledLink>
          <StyledLink url={Config.TWITTER_URL}>
            <TwitterSvg />
          </StyledLink>
          <StyledLink url={Config.TIKTOK_URL}>
            <TikTokSvg />
          </StyledLink>
          <StyledLink url={Config.YOUTUBE_URL}>
            <YouTubeSvg />
          </StyledLink>
          <StyledLink url={Config.LINKTREE_URL}>
            <LinkTreeSvg />
          </StyledLink>
        </IconsArea>
        {email && (
          <DetailRow onPress={handleOnMailPress}>
            <MailSvg />
            <Detail content={email} />
          </DetailRow>
        )}
        {address && (
          <DetailRow onPress={handleOnLocationPress}>
            <StyledLocationSvg />
            <Detail content={address} />
          </DetailRow>
        )}
        <StyledLine />
        <Copyright content={copyRight} />
      </Container>
      <Spacing />
    </View>
  );
};
