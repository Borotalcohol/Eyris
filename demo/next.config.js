/** @type {import('next').NextConfig} */
const path = require("path"); // Import the path module
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  //distDir: 'build',
  // images: {
  //   unoptimized: true,
  // },
  webpack: (config, {}) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

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
          // {
          //   from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
          //   to: "static/chunks/pages",
          // },
          // {
          //   from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
          //   to: "static/chunks/pages",
          // },
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
