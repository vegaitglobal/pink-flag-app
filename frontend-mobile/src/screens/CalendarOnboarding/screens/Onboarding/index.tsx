import React from 'react';
import { ScrollIndicator } from './components';
import {
  NameInputScreen,
  OverviewScreen,
  BirthdayInputScreen,
  PeriodInputScreen,
  CalendarInputScreen,
} from './screens';
import { Container, StyledPagerView, IndicatorContainer, Footer, StyledPrimaryButton } from './styles';
import { ButtonContents, PAGE_MARGIN, SLIDE_COUNT } from './constants';
import { useBusinessLogic } from './hooks';
import { AuthenticatedUser } from '@pf/constants';

interface Props {
  authenticatedUser?: AuthenticatedUser;
}

export const OnboardingScreen: React.FC<Props> = ({ authenticatedUser }) => {
  const { onInputChange, notFirstPage, currentPage, buttonStates, handleOnButtonPress, pagerViewRef } =
    useBusinessLogic(authenticatedUser);

  return (
    <Container>
      <StyledPagerView pageMargin={PAGE_MARGIN} scrollEnabled={false} ref={pagerViewRef}>
        <OverviewScreen />
        <NameInputScreen onInputChange={onInputChange} initialValue={authenticatedUser?.name} />
        <BirthdayInputScreen onInputChange={onInputChange} />
        <PeriodInputScreen onInputChange={onInputChange} currentPageIndex={currentPage} />
        <CalendarInputScreen onInputChange={onInputChange} />
      </StyledPagerView>
      <Footer>
        {notFirstPage && (
          <IndicatorContainer>
            {Array.from(Array(SLIDE_COUNT).keys()).map((key, index) => (
              <ScrollIndicator isFilled={currentPage === index + 1} key={key} />
            ))}
          </IndicatorContainer>
        )}
        <StyledPrimaryButton
          content={ButtonContents[currentPage]}
          disabled={buttonStates[currentPage]}
          onPress={handleOnButtonPress}
        />
      </Footer>
    </Container>
  );
};
