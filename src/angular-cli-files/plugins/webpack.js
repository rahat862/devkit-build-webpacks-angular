"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
// Exports the webpack plugins we use internally.
var base_href_webpack_plugin_1 = require("../lib/base-href-webpack/base-href-webpack-plugin");
exports.BaseHrefWebpackPlugin = base_href_webpack_plugin_1.BaseHrefWebpackPlugin;
var cleancss_webpack_plugin_1 = require("./cleancss-webpack-plugin");
exports.CleanCssWebpackPlugin = cleancss_webpack_plugin_1.CleanCssWebpackPlugin;
var bundle_budget_1 = require("./bundle-budget");
exports.BundleBudgetPlugin = bundle_budget_1.BundleBudgetPlugin;
var scripts_webpack_plugin_1 = require("./scripts-webpack-plugin");
exports.ScriptsWebpackPlugin = scripts_webpack_plugin_1.ScriptsWebpackPlugin;
var suppress_entry_chunks_webpack_plugin_1 = require("./suppress-entry-chunks-webpack-plugin");
exports.SuppressExtractedTextChunksWebpackPlugin = suppress_entry_chunks_webpack_plugin_1.SuppressExtractedTextChunksWebpackPlugin;
var postcss_cli_resources_1 = require("./postcss-cli-resources");
exports.PostcssCliResources = postcss_cli_resources_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfd2VicGFjay9zcmMvYW5ndWxhci1jbGktZmlsZXMvcGx1Z2lucy93ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsK0RBQStEOztBQUUvRCxpREFBaUQ7QUFDakQsOEZBQTBGO0FBQWpGLDJEQUFBLHFCQUFxQixDQUFBO0FBQzlCLHFFQUFnRztBQUF2RiwwREFBQSxxQkFBcUIsQ0FBQTtBQUM5QixpREFBZ0Y7QUFBdkUsNkNBQUEsa0JBQWtCLENBQUE7QUFDM0IsbUVBQTZGO0FBQXBGLHdEQUFBLG9CQUFvQixDQUFBO0FBQzdCLCtGQUFrRztBQUF6RiwwRkFBQSx3Q0FBd0MsQ0FBQTtBQUNqRCxpRUFHaUM7QUFGL0Isc0RBQUEsT0FBTyxDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cblxuLy8gRXhwb3J0cyB0aGUgd2VicGFjayBwbHVnaW5zIHdlIHVzZSBpbnRlcm5hbGx5LlxuZXhwb3J0IHsgQmFzZUhyZWZXZWJwYWNrUGx1Z2luIH0gZnJvbSAnLi4vbGliL2Jhc2UtaHJlZi13ZWJwYWNrL2Jhc2UtaHJlZi13ZWJwYWNrLXBsdWdpbic7XG5leHBvcnQgeyBDbGVhbkNzc1dlYnBhY2tQbHVnaW4sIENsZWFuQ3NzV2VicGFja1BsdWdpbk9wdGlvbnMgfSBmcm9tICcuL2NsZWFuY3NzLXdlYnBhY2stcGx1Z2luJztcbmV4cG9ydCB7IEJ1bmRsZUJ1ZGdldFBsdWdpbiwgQnVuZGxlQnVkZ2V0UGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vYnVuZGxlLWJ1ZGdldCc7XG5leHBvcnQgeyBTY3JpcHRzV2VicGFja1BsdWdpbiwgU2NyaXB0c1dlYnBhY2tQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9zY3JpcHRzLXdlYnBhY2stcGx1Z2luJztcbmV4cG9ydCB7IFN1cHByZXNzRXh0cmFjdGVkVGV4dENodW5rc1dlYnBhY2tQbHVnaW4gfSBmcm9tICcuL3N1cHByZXNzLWVudHJ5LWNodW5rcy13ZWJwYWNrLXBsdWdpbic7XG5leHBvcnQge1xuICBkZWZhdWx0IGFzIFBvc3Rjc3NDbGlSZXNvdXJjZXMsXG4gIFBvc3Rjc3NDbGlSZXNvdXJjZXNPcHRpb25zLFxufSBmcm9tICcuL3Bvc3Rjc3MtY2xpLXJlc291cmNlcyc7XG5cbiJdfQ==