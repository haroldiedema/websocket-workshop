"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SassCompiler = void 0;
const harmony_1 = require("@byteshift/harmony");
const injector_1 = require("@byteshift/injector");
const path = require("path");
const sass_1 = require("sass");
let SassCompiler = class SassCompiler {
    constructor() {
        this.priority = 1;
    }
    async callback(event) {
        if (false === event.fileName.endsWith('.scss')) {
            return;
        }
        const result = sass_1.renderSync({
            file: event.fileName,
            includePaths: [path.resolve(path.dirname(event.fileName))]
        });
        event.setResponse(new harmony_1.Response(result.css, 200, 'text/css'));
    }
};
SassCompiler = __decorate([
    injector_1.Service
], SassCompiler);
exports.SassCompiler = SassCompiler;
