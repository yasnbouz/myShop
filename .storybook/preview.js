import { Providers } from '../src/providers/default';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
import { decorators as RouterDecorators } from 'storybook-addon-next-router/dist/preset/addDecorator';

import * as NextImage from 'next/future/image';
import '../src/styles/global.css';
import 'windi.css';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
export const decorators = [(story) => <Providers>{story()}</Providers>, ...RouterDecorators];
