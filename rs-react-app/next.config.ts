import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  distDir: './dist',

  webpack(config) {
    config.module.rules.forEach((rule: any) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((one: any) => {
          if (one.use) {
            const uses = Array.isArray(one.use) ? one.use : [one.use];

            uses.forEach((u: any) => {
              if (u.loader?.includes('css-loader') && u.options?.modules) {
                u.options.modules.exportLocalsConvention = 'camelCase';
              }
            });
          }
        });
      }
    });
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
