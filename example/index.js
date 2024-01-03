"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dist_1 = require("../dist");
var Example = /** @class */ (function () {
    function Example() {
        this.clientId = 'ci_test_diamano_pay_sn_141d9a95a6094d7e8522dd293e34f396';
        this.clientSecret = 'cs_test_diamano_pay_sn_56b8c933b1f24e658dc741e936509a36';
        this.prod = false;
        this.init();
    }
    Example.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var diamanoPayAPI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dist_1.DiamanoPayAPI.init(this.clientSecret, this.clientId, this.prod)];
                    case 1:
                        diamanoPayAPI = _a.sent();
                        // const diamanoPayAPI = await DiamanoPayAPI.initWithToken(
                        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNmRjOWQ1LTRhODQtNDFhOS05YzI2LTExYTljMDY0Mzc0OCIsInNjb3BlIjpbImFwaS5vcmFuZ2VfbW9uZXkub25lX3N0ZXAiXSwiaWF0IjoxNzA0Mjk0OTUwLCJleHAiOjE3NjQ3MTYzOTl9.6u1-a36Z87l5-7WMqcfSTs3SPDSVVcgjVQOjQB1SMKM',
                        //   this.prod,
                        // );
                        // Création d'un instance Api
                        this.api = diamanoPayAPI.newApi();
                        // Création d'un instance Page
                        this.page = diamanoPayAPI.newPage();
                        return [2 /*return*/];
                }
            });
        });
    };
    Example.prototype.payByOrangeMoneyOneStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            amount: 1000,
                            customerId: '7761234567',
                            description: "Achat d'un chargeur",
                            otp: '123456'
                        };
                        return [4 /*yield*/, this.api.payByOrangeMoneyOneStep(body)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Example.prototype.payByOrangeMoneyQrCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            amount: 1000,
                            description: "Achat d'un chargeur",
                            callbackCancelUrl: 'https://www.maboutique.sn?cancel=true',
                            callbackSuccessUrl: 'https://www.maboutique.sn?success=ok',
                            extraData: { idClient: '123456' },
                            webhook: 'https://www.maboutique.sn/callback'
                        };
                        return [4 /*yield*/, this.api.payByOrangeMoneyQrCode(body)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Example.prototype.payByWaveQrCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            amount: 1000,
                            description: "Achat d'un chargeur",
                            callbackCancelUrl: 'https://www.maboutique.sn?cancel=true',
                            callbackSuccessUrl: 'https://www.maboutique.sn?success=ok',
                            extraData: { idClient: '123456' },
                            webhook: 'https://www.maboutique.sn/callback'
                        };
                        return [4 /*yield*/, this.api.payByWaveQrCode(body)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Example.prototype.getStripeClientSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            amount: 1000,
                            description: "Achat d'un chargeur",
                            callbackCancelUrl: 'https://www.maboutique.sn?cancel=true',
                            callbackSuccessUrl: 'https://www.maboutique.sn?success=ok',
                            extraData: { idClient: '123456' },
                            webhook: 'https://www.maboutique.sn/callback'
                        };
                        return [4 /*yield*/, this.api.getStripeClientSecret(body)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Example.prototype.getPaymentPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            amount: 1000,
                            description: "Achat d'un chargeur",
                            callbackCancelUrl: 'https://www.maboutique.sn?cancel=true',
                            callbackSuccessUrl: 'https://www.maboutique.sn?success=ok',
                            extraData: { idClient: '123456' },
                            webhook: 'https://www.maboutique.sn/callback'
                        };
                        return [4 /*yield*/, this.page.getPaymentToken(body)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return Example;
}());
var example = new Example();
setTimeout(function () {
    example.payByOrangeMoneyQrCode();
}, 5000);
