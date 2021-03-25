"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const harmony_1 = require("@byteshift/harmony");
class AppController {
    indexAction(session) {
        return {
            nickname: session.get('nickname', '')
        };
    }
    appAction(request, session) {
        session.set('nickname', request.get('nickname'));
        return {
            nickname: session.get('nickname', '')
        };
    }
}
__decorate([
    harmony_1.Route("/"),
    harmony_1.Template("index.html"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [harmony_1.Session]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "indexAction", null);
__decorate([
    harmony_1.Route("/app", { method: "POST" }),
    harmony_1.Template("app.html"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [harmony_1.Request, harmony_1.Session]),
    __metadata("design:returntype", Object)
], AppController.prototype, "appAction", null);
exports.AppController = AppController;
