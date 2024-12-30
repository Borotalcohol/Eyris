/** @type {import('next').NextConfig} */
const path = require("path"); // Import the path module
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  // swcMinify: false,
  //distDir: 'build',
  // images: {
  //   unoptimized: true,
  // },
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

    config.optimization.minimizer = [
      new TerserPlugin({
        exclude: /node_modules\/jimp/,
        terserOptions: {
          mangle: true,
          compress: {
            drop_console: true,
          },
        },
      }),
    ];

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./model",
            to: "static/chunks/pages",
          },
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
