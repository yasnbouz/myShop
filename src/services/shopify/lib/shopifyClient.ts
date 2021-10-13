const storeFrontId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID || ``;
const storeFrontToken = process.env.NEXT_PUBLIC_SHOPIFY_API_TOKEN || ``;
const url = `https://${storeFrontId}.myshopify.com/api/2021-07/graphql.json`;

export const fetcher =
  <TData, TVariables>(query: string, variables?: TVariables): (() => Promise<TData>) =>
  async () => {
    const res = await fetch(url, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
        'X-Shopify-Storefront-Access-Token': storeFrontToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors } = await res.json();

    if (errors) {
      const { message } = errors[0] || `Error..`;
      throw new Error(message);
    }
    return data;
  };
