/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BuildEvent, Builder, BuilderConfiguration, BuilderContext } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { LoggingCallback } from '../webpack';
import { Schema as WebpackDevServerBuilderSchema } from './schema';
export interface DevServerResult {
    port: number;
    family: string;
    address: string;
}
export declare class WebpackDevServerBuilder implements Builder<WebpackDevServerBuilderSchema> {
    context: BuilderContext;
    constructor(context: BuilderContext);
    run(builderConfig: BuilderConfiguration<WebpackDevServerBuilderSchema>): Observable<BuildEvent<DevServerResult>>;
    loadWebpackConfig(webpackConfigPath: string): Observable<webpack.Configuration>;
    runWebpackDevServer(webpackConfig: webpack.Configuration, devServerCfg?: WebpackDevServer.Configuration, loggingCb?: LoggingCallback): Observable<BuildEvent<DevServerResult>>;
}
export default WebpackDevServerBuilder;
