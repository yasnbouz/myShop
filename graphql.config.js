const dotenv = require('dotenv');

dotenv.config({ path: `.env.local` });

module.exports = {
  schema: [
    {
      [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/api/2021-07/graphql.json`]: {
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_API_TOKEN,
        },
      },
    },
  ],
  documents: [`src/services/**/graphql/**/*.{ts,gql,graphql}`],
};
