import { Product, ProductEdge, useGetProductQuery } from '@/services/shopify/generated/types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/future/image';
import { useRouter } from 'next/router';

import '@splidejs/react-splide/css';
import { NextSeo } from 'next-seo';
import { defaultUrl } from 'next-seo.config';
import ProductContent from './ProductContent';
import RecommendedProducts from './RecommendedProducts';

function ProductDetail() {
  const router = useRouter();
  const variables = { handle: `${router.query.pid}` };
  const { data, fetchStatus } = useGetProductQuery(variables);
  const product = data?.productByHandle;
  if (fetchStatus === `fetching`) {
    return <p>product fetching...</p>;
  }

  return (
    <>
      <div className="bg-[white]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col space-y-4 md:items-center lg:(flex-row space-y-0 items-start space-x-8) xl:(space-x-20)">
            <div className="w-full relative h-510px lg:(w-1/2)">
              <Splide options={{ height: `510px` }} className="h-full rounded-3xl overflow-hidden" aria-label={`${data?.productByHandle?.title} images`}>
                {product?.images.edges.map((img, index) => (
                  <SplideSlide key={img.node.originalSrc}>
                    <Image
                      src={`${img.node.originalSrc}`}
                      alt={`${img.node.altText}`}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw,
                             50vw"
                      fill
                      priority={index === 0}
                    />
                  </SplideSlide>
                ))}
              </Splide>
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
}
export default ProductDetail;
