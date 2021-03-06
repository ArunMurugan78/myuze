import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';

export function templateFactory<Props>(
  Component: (props: Props) => ReactElement,
): Story<Props> {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (props: Props): ReactElement => <Component {...props} />;
}

export function storyFactory<Props>(
  Component: (props: Props) => ReactElement,
  props: Props,
): Story<Props> {
  const Template = templateFactory(Component);
  const CloneComponent = Template.bind({});
  CloneComponent.args = props;

  return CloneComponent;
}
