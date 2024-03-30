/** @type {import('next').NextConfig} */
const path = require("path"); // Import the path module
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  //distDir: 'build',
  webpack: (config, {}) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    // Add alias mappings for resolving @ alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"), // Assuming styles directory is in the root
    };

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
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
