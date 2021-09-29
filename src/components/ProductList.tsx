import {
  Product,
  useGetProductsInCollectionQuery,
} from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import * as R from 'rambda';

const ProductList = () => {
  const { data } = useGetProductsInCollectionQuery(shopifyClient, {
    handle: `frontpage`,
  });
  const products = data?.collectionByHandle?.products.edges ?? [];
  return (
    <div>
      {R.map((item) => {
        const product = R.path(`node`, item) as Product;
        return <p key={product.id}>{product.title}</p>;
      }, products)}
    </div>
  );
};

export default ProductList;
