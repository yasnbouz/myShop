const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 3000,
};
