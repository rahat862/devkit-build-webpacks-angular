"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
const core_1 = require("@angular-devkit/core");
const path = require("path");
const webpack_1 = require("@ngtools/webpack");
const SilentError = require('silent-error');
const g = typeof global !== 'undefined' ? global : {};
const webpackLoader = g['_DevKitIsLocal']
    ? require.resolve('@ngtools/webpack')
    : '@ngtools/webpack';
function _createAotPlugin(wco, options, host, useMain = true) {
    const { appConfig, root, buildOptions } = wco;
    options.compilerOptions = options.compilerOptions || {};
    if (wco.buildOptions.preserveSymlinks) {
        options.compilerOptions.preserveSymlinks = true;
    }
    // Read the environment, and set it in the compiler host.
    let hostReplacementPaths = {};
    // process environment file replacement
    if (appConfig.environments) {
        if (!appConfig.environmentSource) {
            let migrationMessage = '';
            if ('source' in appConfig.environments) {
                migrationMessage = '\n\n' + core_1.tags.stripIndent `
          A new environmentSource entry replaces the previous source entry inside environments.

          To migrate angular-cli.json follow the example below:

          Before:

          "environments": {
            "source": "environments/environment.ts",
            "dev": "environments/environment.ts",
            "prod": "environments/environment.prod.ts"
          }


          After:

          "environmentSource": "environments/environment.ts",
          "environments": {
            "dev": "environments/environment.ts",
            "prod": "environments/environment.prod.ts"
          }
        `;
            }
            throw new SilentError(`Environment configuration does not contain "environmentSource" entry.${migrationMessage}`);
        }
        if (!(buildOptions.environment in appConfig.environments)) {
            throw new SilentError(`Environment "${buildOptions.environment}" does not exist.`);
        }
        const sourcePath = appConfig.environmentSource;
        const envFile = appConfig.environments[buildOptions.environment];
        hostReplacementPaths = {
            [path.resolve(root, sourcePath)]: path.resolve(root, envFile)
        };
    }
    let i18nInFile = buildOptions.i18nFile
        ? path.resolve(root, buildOptions.i18nFile)
        : undefined;
    const additionalLazyModules = {};
    if (appConfig.lazyModules) {
        for (const lazyModule of appConfig.lazyModules) {
            additionalLazyModules[lazyModule] = path.resolve(root, lazyModule);
        }
    }
    const pluginOptions = Object.assign({ mainPath: useMain ? path.join(root, appConfig.main) : undefined, i18nInFile: i18nInFile, i18nInFormat: buildOptions.i18nFormat, i18nOutFile: buildOptions.i18nOutFile, i18nOutFormat: buildOptions.i18nOutFormat, locale: buildOptions.i18nLocale, platform: appConfig.platform === 'server' ? webpack_1.PLATFORM.Server : webpack_1.PLATFORM.Browser, missingTranslation: buildOptions.i18nMissingTranslation, hostReplacementPaths, sourceMap: buildOptions.sourceMap, additionalLazyModules, nameLazyFiles: buildOptions.namedChunks, forkTypeChecker: buildOptions.forkTypeChecker }, options, { host });
    return new webpack_1.AngularCompilerPlugin(pluginOptions);
}
function getNonAotConfig(wco, host) {
    const { appConfig, root } = wco;
    const tsConfigPath = path.resolve(root, appConfig.tsConfig);
    return {
        module: { rules: [{ test: /\.ts$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath, skipCodeGeneration: true }, host)]
    };
}
exports.getNonAotConfig = getNonAotConfig;
function getAotConfig(wco, host) {
    const { root, buildOptions, appConfig } = wco;
    const tsConfigPath = path.resolve(root, appConfig.tsConfig);
    const loaders = [webpackLoader];
    if (buildOptions.buildOptimizer) {
        loaders.unshift({
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: { sourceMap: buildOptions.sourceMap }
        });
    }
    const test = /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/;
    return {
        module: { rules: [{ test, use: loaders }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath }, host)]
    };
}
exports.getAotConfig = getAotConfig;
function getNonAotTestConfig(wco, host) {
    const { root, appConfig } = wco;
    const tsConfigPath = path.resolve(root, appConfig.tsConfig);
    let pluginOptions = { tsConfigPath, skipCodeGeneration: true };
    return {
        module: { rules: [{ test: /\.ts$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, pluginOptions, host, false)]
    };
}
exports.getNonAotTestConfig = getNonAotTestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfd2VicGFjay9zcmMvYW5ndWxhci1jbGktZmlsZXMvbW9kZWxzL3dlYnBhY2stY29uZmlncy90eXBlc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUJBQWlCO0FBQ2pCLCtEQUErRDtBQUMvRCwrQ0FBdUQ7QUFFdkQsNkJBQTZCO0FBQzdCLDhDQUkwQjtBQUcxQixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFHNUMsTUFBTSxDQUFDLEdBQVEsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMzRCxNQUFNLGFBQWEsR0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7SUFDckMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0FBR3ZCLDBCQUNFLEdBQXlCLEVBQ3pCLE9BQVksRUFDWixJQUEyQixFQUMzQixPQUFPLEdBQUcsSUFBSTtJQUVkLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUM5QyxPQUFPLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO0lBRXhELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2xELENBQUM7SUFFRCx5REFBeUQ7SUFDekQsSUFBSSxvQkFBb0IsR0FBUSxFQUFFLENBQUM7SUFDbkMsdUNBQXVDO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENB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Q0FBQztLQUN6RCxDQUFDO0FBQ0osQ0FBQztBQWxCRCxvQ0FrQkM7QUFFRCw2QkFBb0MsR0FBeUIsRUFBRSxJQUEyQjtJQUN4RixNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNoQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUQsSUFBSSxhQUFhLEdBQVEsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFcEUsTUFBTSxDQUFDO1FBQ0wsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFO1FBQzdELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdELENBQUM7QUFDSixDQUFDO0FBVkQsa0RBVUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5pbXBvcnQgeyB0YWdzLCB2aXJ0dWFsRnMgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBTdGF0cyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge1xuICBBbmd1bGFyQ29tcGlsZXJQbHVnaW4sXG4gIEFuZ3VsYXJDb21waWxlclBsdWdpbk9wdGlvbnMsXG4gIFBMQVRGT1JNXG59IGZyb20gJ0BuZ3Rvb2xzL3dlYnBhY2snO1xuaW1wb3J0IHsgV2VicGFja0NvbmZpZ09wdGlvbnMgfSBmcm9tICcuLi9idWlsZC1vcHRpb25zJztcblxuY29uc3QgU2lsZW50RXJyb3IgPSByZXF1aXJlKCdzaWxlbnQtZXJyb3InKTtcblxuXG5jb25zdCBnOiBhbnkgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHt9O1xuY29uc3Qgd2VicGFja0xvYWRlcjogc3RyaW5nID0gZ1snX0RldktpdElzTG9jYWwnXVxuICA/IHJlcXVpcmUucmVzb2x2ZSgnQG5ndG9vbHMvd2VicGFjaycpXG4gIDogJ0BuZ3Rvb2xzL3dlYnBhY2snO1xuXG5cbmZ1bmN0aW9uIF9jcmVhdGVBb3RQbHVnaW4oXG4gIHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMsXG4gIG9wdGlvbnM6IGFueSxcbiAgaG9zdDogdmlydHVhbEZzLkhvc3Q8U3RhdHM+LFxuICB1c2VNYWluID0gdHJ1ZSxcbikge1xuICBjb25zdCB7IGFwcENvbmZpZywgcm9vdCwgYnVpbGRPcHRpb25zIH0gPSB3Y287XG4gIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zID0gb3B0aW9ucy5jb21waWxlck9wdGlvbnMgfHwge307XG5cbiAgaWYgKHdjby5idWlsZE9wdGlvbnMucHJlc2VydmVTeW1saW5rcykge1xuICAgIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zLnByZXNlcnZlU3ltbGlua3MgPSB0cnVlO1xuICB9XG5cbiAgLy8gUmVhZCB0aGUgZW52aXJvbm1lbnQsIGFuZCBzZXQgaXQgaW4gdGhlIGNvbXBpbGVyIGhvc3QuXG4gIGxldCBob3N0UmVwbGFjZW1lbnRQYXRoczogYW55ID0ge307XG4gIC8vIHByb2Nlc3MgZW52aXJvbm1lbnQgZmlsZSByZXBsYWNlbWVudFxuICBpZiAoYXBwQ29uZmlnLmVudmlyb25tZW50cykge1xuICAgIGlmICghYXBwQ29uZmlnLmVudmlyb25tZW50U291cmNlKSB7XG4gICAgICBsZXQgbWlncmF0aW9uTWVzc2FnZSA9ICcnO1xuICAgICAgaWYgKCdzb3VyY2UnIGluIGFwcENvbmZpZy5lbnZpcm9ubWVudHMpIHtcbiAgICAgICAgbWlncmF0aW9uTWVzc2FnZSA9ICdcXG5cXG4nICsgdGFncy5zdHJpcEluZGVudGBcbiAgICAgICAgICBBIG5ldyBlbnZpcm9ubWVudFNvdXJjZSBlbnRyeSByZXBsYWNlcyB0aGUgcHJldmlvdXMgc291cmNlIGVudHJ5IGluc2lkZSBlbnZpcm9ubWVudHMuXG5cbiAgICAgICAgICBUbyBtaWdyYXRlIGFuZ3VsYXItY2xpLmpzb24gZm9sbG93IHRoZSBleGFtcGxlIGJlbG93OlxuXG4gICAgICAgICAgQmVmb3JlOlxuXG4gICAgICAgICAgXCJlbnZpcm9ubWVudHNcIjoge1xuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJlbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHNcIixcbiAgICAgICAgICAgIFwiZGV2XCI6IFwiZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzXCIsXG4gICAgICAgICAgICBcInByb2RcIjogXCJlbnZpcm9ubWVudHMvZW52aXJvbm1lbnQucHJvZC50c1wiXG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBBZnRlcjpcblxuICAgICAgICAgIFwiZW52aXJvbm1lbnRTb3VyY2VcIjogXCJlbnZpcm9ubWVudHMvZW52aXJvbm1lbnQudHNcIixcbiAgICAgICAgICBcImVudmlyb25tZW50c1wiOiB7XG4gICAgICAgICAgICBcImRldlwiOiBcImVudmlyb25tZW50cy9lbnZpcm9ubWVudC50c1wiLFxuICAgICAgICAgICAgXCJwcm9kXCI6IFwiZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnByb2QudHNcIlxuICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBTaWxlbnRFcnJvcihcbiAgICAgICAgYEVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gZG9lcyBub3QgY29udGFpbiBcImVudmlyb25tZW50U291cmNlXCIgZW50cnkuJHttaWdyYXRpb25NZXNzYWdlfWBcbiAgICAgICk7XG5cbiAgICB9XG4gICAgaWYgKCEoYnVpbGRPcHRpb25zLmVudmlyb25tZW50IGFzIGFueSBpbiBhcHBDb25maWcuZW52aXJvbm1lbnRzKSkge1xuICAgICAgdGhyb3cgbmV3IFNpbGVudEVycm9yKGBFbnZpcm9ubWVudCBcIiR7YnVpbGRPcHRpb25zLmVudmlyb25tZW50fVwiIGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVBhdGggPSBhcHBDb25maWcuZW52aXJvbm1lbnRTb3VyY2U7XG4gICAgY29uc3QgZW52RmlsZSA9IGFwcENvbmZpZy5lbnZpcm9ubWVudHNbYnVpbGRPcHRpb25zLmVudmlyb25tZW50IGFzIGFueV07XG5cbiAgICBob3N0UmVwbGFjZW1lbnRQYXRocyA9IHtcbiAgICAgIFtwYXRoLnJlc29sdmUocm9vdCwgc291cmNlUGF0aCldOiBwYXRoLnJlc29sdmUocm9vdCwgZW52RmlsZSlcbiAgICB9O1xuICB9XG5cbiAgbGV0IGkxOG5JbkZpbGUgPSBidWlsZE9wdGlvbnMuaTE4bkZpbGVcbiAgICA/IHBhdGgucmVzb2x2ZShyb290LCBidWlsZE9wdGlvbnMuaTE4bkZpbGUpXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgYWRkaXRpb25hbExhenlNb2R1bGVzOiB7IFttb2R1bGU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGlmIChhcHBDb25maWcubGF6eU1vZHVsZXMpIHtcbiAgICBmb3IgKGNvbnN0IGxhenlNb2R1bGUgb2YgYXBwQ29uZmlnLmxhenlNb2R1bGVzKSB7XG4gICAgICBhZGRpdGlvbmFsTGF6eU1vZHVsZXNbbGF6eU1vZHVsZV0gPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHJvb3QsXG4gICAgICAgIGxhenlNb2R1bGUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsdWdpbk9wdGlvbnM6IEFuZ3VsYXJDb21waWxlclBsdWdpbk9wdGlvbnMgPSB7XG4gICAgbWFpblBhdGg6IHVzZU1haW4gPyBwYXRoLmpvaW4ocm9vdCwgYXBwQ29uZmlnLm1haW4pIDogdW5kZWZpbmVkLFxuICAgIGkxOG5JbkZpbGU6IGkxOG5JbkZpbGUsXG4gICAgaTE4bkluRm9ybWF0OiBidWlsZE9wdGlvbnMuaTE4bkZvcm1hdCxcbiAgICBpMThuT3V0RmlsZTogYnVpbGRPcHRpb25zLmkxOG5PdXRGaWxlLFxuICAgIGkxOG5PdXRGb3JtYXQ6IGJ1aWxkT3B0aW9ucy5pMThuT3V0Rm9ybWF0LFxuICAgIGxvY2FsZTogYnVpbGRPcHRpb25zLmkxOG5Mb2NhbGUsXG4gICAgcGxhdGZvcm06IGFwcENvbmZpZy5wbGF0Zm9ybSA9PT0gJ3NlcnZlcicgPyBQTEFURk9STS5TZXJ2ZXIgOiBQTEFURk9STS5Ccm93c2VyLFxuICAgIG1pc3NpbmdUcmFuc2xhdGlvbjogYnVpbGRPcHRpb25zLmkxOG5NaXNzaW5nVHJhbnNsYXRpb24sXG4gICAgaG9zdFJlcGxhY2VtZW50UGF0aHMsXG4gICAgc291cmNlTWFwOiBidWlsZE9wdGlvbnMuc291cmNlTWFwLFxuICAgIGFkZGl0aW9uYWxMYXp5TW9kdWxlcyxcbiAgICBuYW1lTGF6eUZpbGVzOiBidWlsZE9wdGlvbnMubmFtZWRDaHVua3MsXG4gICAgZm9ya1R5cGVDaGVja2VyOiBidWlsZE9wdGlvbnMuZm9ya1R5cGVDaGVja2VyLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgaG9zdCxcbiAgfTtcbiAgcmV0dXJuIG5ldyBBbmd1bGFyQ29tcGlsZXJQbHVnaW4ocGx1Z2luT3B0aW9ucyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb25Bb3RDb25maWcod2NvOiBXZWJwYWNrQ29uZmlnT3B0aW9ucywgaG9zdDogdmlydHVhbEZzLkhvc3Q8U3RhdHM+KSB7XG4gIGNvbnN0IHsgYXBwQ29uZmlnLCByb290IH0gPSB3Y287XG4gIGNvbnN0IHRzQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShyb290LCBhcHBDb25maWcudHNDb25maWcpO1xuXG4gIHJldHVybiB7XG4gICAgbW9kdWxlOiB7IHJ1bGVzOiBbeyB0ZXN0OiAvXFwudHMkLywgbG9hZGVyOiB3ZWJwYWNrTG9hZGVyIH1dIH0sXG4gICAgcGx1Z2luczogW19jcmVhdGVBb3RQbHVnaW4od2NvLCB7IHRzQ29uZmlnUGF0aCwgc2tpcENvZGVHZW5lcmF0aW9uOiB0cnVlIH0sIGhvc3QpXVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW90Q29uZmlnKHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMsIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PFN0YXRzPikge1xuICBjb25zdCB7IHJvb3QsIGJ1aWxkT3B0aW9ucywgYXBwQ29uZmlnIH0gPSB3Y287XG4gIGNvbnN0IHRzQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShyb290LCBhcHBDb25maWcudHNDb25maWcpO1xuXG4gIGNvbnN0IGxvYWRlcnM6IGFueVtdID0gW3dlYnBhY2tMb2FkZXJdO1xuICBpZiAoYnVpbGRPcHRpb25zLmJ1aWxkT3B0aW1pemVyKSB7XG4gICAgbG9hZGVycy51bnNoaWZ0KHtcbiAgICAgIGxvYWRlcjogJ0Bhbmd1bGFyLWRldmtpdC9idWlsZC1vcHRpbWl6ZXIvd2VicGFjay1sb2FkZXInLFxuICAgICAgb3B0aW9uczogeyBzb3VyY2VNYXA6IGJ1aWxkT3B0aW9ucy5zb3VyY2VNYXAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgdGVzdCA9IC8oPzpcXC5uZ2ZhY3RvcnlcXC5qc3xcXC5uZ3N0eWxlXFwuanN8XFwudHMpJC87XG5cbiAgcmV0dXJuIHtcbiAgICBtb2R1bGU6IHsgcnVsZXM6IFt7IHRlc3QsIHVzZTogbG9hZGVycyB9XSB9LFxuICAgIHBsdWdpbnM6IFtfY3JlYXRlQW90UGx1Z2luKHdjbywgeyB0c0NvbmZpZ1BhdGggfSwgaG9zdCldXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb25Bb3RUZXN0Q29uZmlnKHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMsIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PFN0YXRzPikge1xuICBjb25zdCB7IHJvb3QsIGFwcENvbmZpZyB9ID0gd2NvO1xuICBjb25zdCB0c0NvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUocm9vdCwgYXBwQ29uZmlnLnRzQ29uZmlnKTtcblxuICBsZXQgcGx1Z2luT3B0aW9uczogYW55ID0geyB0c0NvbmZpZ1BhdGgsIHNraXBDb2RlR2VuZXJhdGlvbjogdHJ1ZSB9O1xuXG4gIHJldHVybiB7XG4gICAgbW9kdWxlOiB7IHJ1bGVzOiBbeyB0ZXN0OiAvXFwudHMkLywgbG9hZGVyOiB3ZWJwYWNrTG9hZGVyIH1dIH0sXG4gICAgcGx1Z2luczogW19jcmVhdGVBb3RQbHVnaW4od2NvLCBwbHVnaW5PcHRpb25zLCBob3N0LCBmYWxzZSldXG4gIH07XG59XG4iXX0=