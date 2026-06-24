import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://valtrix-frontend-y7df.vercel.app';
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/solutions',
    '/industries',
    '/privacy-policy',
    '/terms-of-use',
    '/cookies',
    '/compliance',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
