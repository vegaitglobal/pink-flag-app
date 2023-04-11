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

const CURRENT_YEAR = new Date().getFullYear();
const HIT_SLOP = { top: 2, left: 10, right: 10, bottom: 10 };

export const Footer: React.FC = ({ ...props }) => {
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
        <Title content="Kontakt" />
        <IconsArea>
          <StyledLink url={Config.INSTAGRAM_URL} hitSlop={HIT_SLOP}>
            <InstagramSvg />
          </StyledLink>
          <StyledLink url={Config.FACEBOOK_URL}>
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
        {Config.EMAIL && (
          <DetailRow onPress={handleOnMailPress}>
            <MailSvg />
            <Detail content={Config.EMAIL} />
          </DetailRow>
        )}
        {Config.ADDRESS && (
          <DetailRow onPress={handleOnLocationPress}>
            <StyledLocationSvg />
            <Detail content={Config.ADDRESS} />
          </DetailRow>
        )}
        <StyledLine />
        <Copyright content={`© ${CURRENT_YEAR} ${Config.APP_NAME || ''}. All rights reserved.`} />
      </Container>
      <Spacing />
    </View>
  );
};
