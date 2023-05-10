import { WIDTH } from '@pf/constants';
import React, { useMemo } from 'react';
import RenderHTML from 'react-native-render-html';
import { getLinkStyle, getParagraphStyle, BulletStyle, tagStyles } from './styles';
import { useTheme } from '@emotion/react';

const PADDING = 40;
const CONTENT_WIDTH = WIDTH - PADDING;

interface Props {
  content: string;
}

export const Paragraph: React.FC<Props> = ({ content }) => {
  const theme = useTheme();
  const linkStyle = useMemo(() => getLinkStyle(theme), [theme]);
  const paragraphStyle = useMemo(() => getParagraphStyle(theme), [theme]);
  const parsedContent = useMemo(() => ({ html: content.replace('<a', `<a style=${linkStyle}`) }), [content, linkStyle]);

  return (
    <RenderHTML
      baseStyle={paragraphStyle}
      renderersProps={BulletStyle}
      tagsStyles={tagStyles}
      contentWidth={CONTENT_WIDTH}
      source={parsedContent}
    />
  );
};
