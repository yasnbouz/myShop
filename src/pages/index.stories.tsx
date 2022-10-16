import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from './index.page';

export default {
  title: `Pages/Home`,
  component: Home,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 5000 },
  },
} as ComponentMeta<typeof Home>;

// eslint-disable-next-line react/function-component-definition
export const HomePage: ComponentStory<typeof Home> = () => <Home />;

HomePage.story = {
  parameters: {
    nextRouter: {
      path: `/`,
      asPath: `/`,
      query: { slug: `ezfezfze` },
    },
  },
};
