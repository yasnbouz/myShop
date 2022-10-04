import { ComponentStory, ComponentMeta } from '@storybook/react';

import Product from './[pid]';

export default {
  title: `Pages/Product`,
  component: Product,
} as ComponentMeta<typeof Product>;

// eslint-disable-next-line react/function-component-definition
export const ProductPage: ComponentStory<typeof Product> = () => <Product />;
ProductPage.story = {
  parameters: {
    nextRouter: {
      path: `/products/[pid]`,
      asPath: `/products/zion-1`,
      query: {
        pid: `zion-1`,
      },
    },
  },
};
