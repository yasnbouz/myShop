import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
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
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      Desktop: {
        name: 'Desktop',
        styles: {
          width: '1903px',
          height: '969px',
        },
      },
    },
    defaultViewport: 'responsive',
  },
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

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      showName: true,
      items: [{ value: 'en', title: 'English' }],
    },
  },
};
