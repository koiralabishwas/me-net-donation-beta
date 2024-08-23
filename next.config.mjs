/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack settings to load custom fonts
  // file-loader must be installed
  output : 'export',
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(ttf|eot|woff|woff2)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/fonts/",
            publicPath: "/_next/static/fonts/",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
