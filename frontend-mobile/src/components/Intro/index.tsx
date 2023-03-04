/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { AboutUsImage, Container, Content, Description, ImageContainer, Title } from './styles';

export const Intro: React.FC = () => {
  return (
    <Container source={require('../../assets/images/intro-background.png')} resizeMode="stretch">
      <Content>
        <Title content="Pink Flag" />
        <Description content="Dobrodošli na PINK FLAG aplikaciju Ženske inicijative koja radi na otklanjanju menstrualnog siromaštva i informisanju zajednice o potrebi besplatnih menstrualnih uložaka u svim obrazovnim ustanovama širom Republike Srbije. Pomoću ove aplikacije bićete informisani o svim važnim dešavanjima koja su u vezi sa menstrualnim siromaštvom, pink taksama i porezom na menstrualne uloške." />
        <ImageContainer>
          <AboutUsImage source={require('../../assets/images/about-us.jpg')} resizeMode="cover" />
        </ImageContainer>
      </Content>
    </Container>
  );
};
