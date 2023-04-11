import React from 'react';
import { BlogListModule, BlogModule, Footer } from '@pf/components';
import { Container, Content, StyledDonateBanner } from './styles';
import Animated, { Layout } from 'react-native-reanimated';

const MASS = 100;

export const BlogScreen: React.FC = () => {
  return (
    <Animated.View layout={Layout.mass(MASS)}>
      <Container showsVerticalScrollIndicator={false}>
        <Content>
          <BlogModule />
          <BlogListModule />
          <StyledDonateBanner />
        </Content>
        <Footer />
      </Container>
    </Animated.View>
  );
};
