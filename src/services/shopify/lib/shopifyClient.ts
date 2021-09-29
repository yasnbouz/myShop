import { GraphQLClient } from 'graphql-request';

const storeFrontId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID || ``;
const storeFrontToken = process.env.NEXT_PUBLIC_SHOPIFY_API_TOKEN || ``;
const url = `https://${storeFrontId}.myshopify.com/api/2021-07/graphql.json`;

export const shopifyClient = new GraphQLClient(url, {
  headers: {
    'X-Shopify-Storefront-Access-Token': storeFrontToken,
  },
});
