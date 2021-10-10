const description = 'Learn how to build modern, SEO ready commerce storefronts with yasnbouz, Next.js, Shopify, and Vercel.';
const title = 'Build Modern Commerce Experiences with a Shopify Storefront Api';
const url = process.env.NEXT_PUBLIC_SITE_URL;

const SEO = {
  title,
  titleTemplate: '%s | MyShop',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url,
    site_name: 'MyShop',
    images: [
      {
        url: `/images/brand.png`,
        width: 800,
        height: 600,
        alt: 'MyShop image',
      },
    ],
  },
  twitter: {
    handle: '@yasnbouz',
    site: '@yasnbouz',
    cardType: 'summary_large_image',
  },
};

export { SEO, url as defaultUrl };
