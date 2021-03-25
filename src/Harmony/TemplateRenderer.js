"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRenderer = void 0;
const harmony_1 = require("@byteshift/harmony");
const injector_1 = require("@byteshift/injector");
const fs = require("fs");
let TemplateRenderer = class TemplateRenderer {
    constructor() {
        this.priority = 1;
    }
    async callback(event) {
        if (false === event.templateFile.endsWith('.html')) {
            return;
        }
        let src = fs.readFileSync(event.templateFile).toString();
        Object.keys((event.data || {})).forEach((key) => {
            const searchValue = `{{ ${key} }}`;
            while (src.indexOf(searchValue) !== -1) {
                src = src.replace(searchValue, event.data[key]);
            }
        });
        event.setResponse(new harmony_1.HtmlResponse(src, 200));
    }
};
TemplateRenderer = __decorate([
    injector_1.Service
], TemplateRenderer);
exports.TemplateRenderer = TemplateRenderer;
