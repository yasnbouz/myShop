import { Product, useGetProductDetailQuery } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ProductContent from './ProductContent';

const ProductDetail = () => {
  const router = useRouter();
  const variables = { handle: `${router.query.pid}` };
  const { data } = useGetProductDetailQuery(shopifyClient, variables);
  const images = data?.productByHandle?.images?.edges ?? [];
  return (
    <section className="bg-[white]">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col space-y-4 items-center md:(flex-row space-y-0 items-start space-x-8) xl:(space-x-20)">
          <div className="bg-[white] rounded-3xl shadow-lg overflow-hidden w-full lg:(w-1/2)">
            <div className="relative h-120">
              <Image src={images[0].node.originalSrc} objectFit="cover" layout="fill" alt="" />
            </div>
          </div>
          <ProductContent product={data?.productByHandle as Product} />
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
