import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from './index.page';

export default {
  title: `Pages/Home`,
  component: Home,
} as ComponentMeta<typeof Home>;

// eslint-disable-next-line react/function-component-definition
export const HomePage: ComponentStory<typeof Home> = () => <Home />;

HomePage.story = {
  parameters: {
    nextRouter: {
      path: `/`,
      asPath: `/`,
      query: { slug: `ezfezfze` },
      locale: `en`,
    },
  },
};
