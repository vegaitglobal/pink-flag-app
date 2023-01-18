import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Container, shadowStyles } from './styles';
import { NavButton } from '../NavButton';
import { getPathIcon, getPathName, PathName } from './utils';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <Container style={shadowStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const displayName = getPathName(label as PathName);
        const Icon = getPathIcon(label as string, isFocused);

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({ name: route.name, merge: true });
            navigation.navigate(route.name);
          }
        };

        return <NavButton key={index} icon={<Icon />} content={displayName} onPress={onPress} isFocused={isFocused} />;
      })}
    </Container>
  );
};
