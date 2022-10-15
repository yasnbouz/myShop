import { ComponentStory, ComponentMeta } from '@storybook/react';

import Product from './[pid].page';

export default {
  title: `Pages/Product`,
  component: Product,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 1000 },
  },
} as ComponentMeta<typeof Product>;

// eslint-disable-next-line react/function-component-definition
export const ProductPage: ComponentStory<typeof Product> = () => <Product />;
ProductPage.story = {
  parameters: {
    nextRouter: {
      path: `/products/[pid]`,
      asPath: `/products/jordan-delta-2`,
      query: {
        pid: `jordan-delta-2`,
      },
    },
  },
};
