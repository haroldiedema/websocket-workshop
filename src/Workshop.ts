import {Harmony}            from '@byteshift/harmony';
import {ServiceHost}        from '@byteshift/injector';
import * as chalk           from 'chalk';
import {lookup}             from 'mime-types';
import * as path            from 'path';
import {AppController}      from './Controller/AppController';
import {SassCompiler}       from './Harmony/SassCompiler';
import {TemplateRenderer}   from './Harmony/TemplateRenderer';
import {TypescriptCompiler} from './Harmony/TypescriptCompiler';

const port = 10101,
      root = path.resolve(path.dirname(__dirname));

const harmony = new Harmony({
    port: port,

    controllers: [AppController],

    enableHttps: false,
    enableSession: true,

    templating: {
        templateDirectories: [path.resolve(root, 'app', 'templates')],
        renderEventListeners: [
            ServiceHost.get(TemplateRenderer)
        ]
    },

    static: {
        publicDirectories: [path.resolve(root, 'app')],
        lookupMimeType: f => lookup(f).toString(),
        staticRequestEventListeners: [
            ServiceHost.get(TypescriptCompiler),
            ServiceHost.get(SassCompiler)
        ]
    }
});

console.log(`Workshop server running at ${chalk.green('http://localhost:' + port + '/')}`);
console.log(`Modified sources in the "${chalk.yellow('app/')}" directory are recompiled automatically.`);

harmony.start();
