import dotenv from 'dotenv';
import { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config({ path: `.env.local` });

const config: CodegenConfig = {
  schema: [
    {
      [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/api/2021-07/graphql.json`]: {
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_API_TOKEN as string,
        },
      },
    },
  ],
  documents: [`src/services/**/graphql/**/*.{ts,gql,graphql}`],
  generates: {
    'src/services/shopify/generated/types.ts': {
      config: {
        useTypeImports: false,
        defaultScalarType: `unknown`,
        useImplementingTypes: true,
        scalars: { DateTime: `string`, Decimal: `string`, HTML: `string`, URL: `string`, Color: `string`, UnsignedInt64: `string` },
      },
      plugins: [
        {
          add: {
            content: [
              `/*
  -  THIS FILE IS AUTO-GENERATED, DO NOT EDIT.
  -  Based on Storefront API 2021-07.
  -  Instead, you can edit the associated .graphql file to query for additional fields and this file will be updated when you run pnpm graphql-types.
*/`,
              `/* eslint-disable */`,
            ],
          },
        },
        `typescript`,
        `typescript-operations`,
        {
          'typescript-react-query': {
            fetcher: `../lib/shopifyClient#fetcher`,
            exposeQueryKeys: true,
            exposeDocument: true,
            exposeFetcher: true,
            legacyMode: false,
          },
        },
      ],
    },
  },
};

export default config;
