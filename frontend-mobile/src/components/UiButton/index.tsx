import { TouchableOpacityProps } from 'react-native';
import { ButtonText, Container } from './styles';

const TEXT_LINES = 1;

export interface UiButtonProps extends TouchableOpacityProps {
  content: string;
}

export const UiButton: React.FC<UiButtonProps> = ({ content, ...props }) => {
  return (
    <Container {...props}>
      <ButtonText content={content} numberOfLines={TEXT_LINES} />
    </Container>
  );
};
