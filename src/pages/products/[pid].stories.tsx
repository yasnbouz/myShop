import { ComponentStory, ComponentMeta } from '@storybook/react';

import Product from './[pid].page';

export default {
  title: `Pages/Product`,
  component: Product,
} as ComponentMeta<typeof Product>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Product> = () => <Product />;
export const Jordan = Template.bind({});
Jordan.story = {
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
export const Zoom = Template.bind({});
Zoom.story = {
  parameters: {
    nextRouter: {
      path: `/products/[pid]`,
      asPath: `/products/zoom-Freak-3`,
      query: {
        pid: `zoom-Freak-3`,
      },
    },
  },
};
