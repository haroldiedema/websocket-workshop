"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypescriptCompiler = void 0;
const harmony_1 = require("@byteshift/harmony");
const injector_1 = require("@byteshift/injector");
const fs = require("fs");
const path = require("path");
const typescript_1 = require("typescript");
let TypescriptCompiler = class TypescriptCompiler {
    constructor() {
        this.priority = 1;
    }
    async callback(event) {
        if (false === event.fileName.endsWith('.ts')) {
            return;
        }
        try {
            const result = typescript_1.transpile(fs.readFileSync(event.fileName).toString(), {
                allowJs: true,
                checkJs: false,
                target: typescript_1.ScriptTarget.ESNext,
                module: typescript_1.ModuleKind.ES2020,
            });
            // Rewrite import statements.
            const lines = result.split(/[\r\n]/g);
            const src = [];
            for (let line of lines) {
                const imports = /^import\s+(.+)\s+from\s+['"](.+)['"];$/gmi.exec(line);
                if (!imports) {
                    src.push(line);
                    continue;
                }
                if (imports[2] && (imports[2].charAt(0) === '.' || imports[2].charAt(0) === '/')) {
                    const fileName = path.resolve(path.dirname(event.fileName), imports[2]);
                    if (!fs.existsSync(fileName)) {
                        line = line.replace(imports[2], imports[2] + '.ts');
                    }
                }
                src.push(line);
            }
            event.setResponse(new harmony_1.Response(src.join("\n"), 200, 'text/javascript'));
        }
        catch (e) {
            event.setResponse(new harmony_1.Response(`console.error(${JSON.stringify(e.message)})`, 500, 'text/javascript'));
        }
    }
};
TypescriptCompiler = __decorate([
    injector_1.Service
], TypescriptCompiler);
exports.TypescriptCompiler = TypescriptCompiler;
