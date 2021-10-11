import { Product, ProductEdge, useGetProductQuery } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { NextSeo } from 'next-seo';
import { defaultUrl } from 'next-seo.config';
import ProductContent from './ProductContent';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RecommendedProducts from './RecommendedProducts';

const ProductDetail = () => {
  const router = useRouter();
  const variables = { handle: `${router.query.pid}` };
  const { data } = useGetProductQuery(shopifyClient, variables);
  const product = data?.productByHandle;
  return (
    <>
      <div className="bg-[white]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col space-y-4 items-center md:(flex-row space-y-0 items-start space-x-8) xl:(space-x-20)">
            <div className=" w-full relative h-510px lg:(w-1/2)">
              <Swiper className="h-full rounded-3xl overflow-hidden" modules={[Pagination, Navigation, A11y]} navigation pagination={{ clickable: true }} slidesPerView={1}>
                {product?.images.edges.map((img) => (
                  <SwiperSlide key={img.node.originalSrc}>
                    <Image src={`${img.node.originalSrc}`} alt={`${img.node.altText}`} layout="fill" objectFit="cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ProductContent product={product as unknown as Product} />
          </div>
        </div>
        <RecommendedProducts current={product?.id} products={product?.collections.edges[0].node.products.edges as ProductEdge[]} />
      </div>
      <NextSeo
        title={product?.title}
        description={product?.description}
        openGraph={{
          url: `${defaultUrl}/${variables.handle}`,
          images: [{ url: product?.images.edges[0].node.originalSrc, width: 800, height: 600, alt: product?.images.edges[0].node.altText as string }],
        }}
      />
    </>
  );
};
export default ProductDetail;
