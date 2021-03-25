"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const harmony_1 = require("@byteshift/harmony");
const injector_1 = require("@byteshift/injector");
const chalk = require("chalk");
const mime_types_1 = require("mime-types");
const path = require("path");
const AppController_1 = require("./Controller/AppController");
const SassCompiler_1 = require("./Harmony/SassCompiler");
const TemplateRenderer_1 = require("./Harmony/TemplateRenderer");
const TypescriptCompiler_1 = require("./Harmony/TypescriptCompiler");
const port = 10101, root = path.resolve(path.dirname(__dirname));
const harmony = new harmony_1.Harmony({
    port: port,
    controllers: [AppController_1.AppController],
    enableHttps: false,
    enableSession: true,
    templating: {
        templateDirectories: [path.resolve(root, 'app', 'templates')],
        renderEventListeners: [
            injector_1.ServiceHost.get(TemplateRenderer_1.TemplateRenderer)
        ]
    },
    static: {
        publicDirectories: [path.resolve(root, 'app')],
        lookupMimeType: f => mime_types_1.lookup(f).toString(),
        staticRequestEventListeners: [
            injector_1.ServiceHost.get(TypescriptCompiler_1.TypescriptCompiler),
            injector_1.ServiceHost.get(SassCompiler_1.SassCompiler)
        ]
    }
});
console.log(`Workshop server running at ${chalk.green('http://localhost:' + port + '/')}`);
console.log(`Modified sources in the "${chalk.yellow('app/')}" directory are recompiled automatically.`);
harmony.start();
