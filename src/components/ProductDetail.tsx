import { useGetProductDetailQuery } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  const variables = { handle: `${router.query?.pid}` };
  const { data } = useGetProductDetailQuery(shopifyClient, variables);

  return (
    <div>
      <h1>{data?.productByHandle?.title}</h1>
      <p>{data?.productByHandle?.description}</p>
    </div>
  );
};

export default ProductDetail;
