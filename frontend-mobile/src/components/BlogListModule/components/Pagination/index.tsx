import React, { useCallback, useMemo } from 'react';
import { Container, NumbersContainer } from './styles';
import { PageNumber } from './components/PageNumber';
import { Arrow } from './components';
import { getPages } from './getPages';

interface Props {
  page: number;
  totalPages: number;
  onPress?: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, totalPages, onPress }) => {
  const indicators = useMemo(() => getPages(page, totalPages - 1), [page, totalPages]);

  const handleOnArrowLeftPress = useCallback(() => {
    onPress?.(page - 1);
  }, [onPress, page]);

  const handleOnArrowRightPress = useCallback(() => {
    onPress?.(page + 1);
  }, [onPress, page]);

  const Indicators = useMemo(
    () =>
      indicators.map((value, index) => (
        <PageNumber key={`pagination_${index}`} content={value} isSelected={page === value} onPress={onPress} />
      )),
    [indicators, onPress, page],
  );

  return (
    <Container>
      <Arrow isDisabled={page === 0} isHidden={indicators.length < 2} onPress={handleOnArrowLeftPress} />
      <NumbersContainer>{Indicators}</NumbersContainer>
      <Arrow
        isRight={true}
        isHidden={indicators.length < 2}
        onPress={handleOnArrowRightPress}
        isDisabled={page === totalPages - 1}
      />
    </Container>
  );
};
