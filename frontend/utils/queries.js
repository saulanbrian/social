"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infiniteQueryAppendResultAtTop = exports.infiniteQueryUpdateAllResults = exports.updateInfiniteQuerySingleResultById = exports.summarizeQueryPagesResult = void 0;
var summarizeQueryPagesResult = function (data) {
    var res = [];
    if (data.pages && data.pages.length >= 1) {
        for (var _i = 0, _a = data.pages; _i < _a.length; _i++) {
            var page = _a[_i];
            res.push.apply(res, page.results);
        }
    }
    return res;
};
exports.summarizeQueryPagesResult = summarizeQueryPagesResult;
var updateInfiniteQuerySingleResultById = function (_a) {
    var data = _a.data, id = _a.id, updateField = _a.updateField;
    return __assign(__assign({}, data), { pages: data.pages.map(function (page) { return (__assign(__assign({}, page), { results: page.results.map(function (result) {
                return result.id === id ? (__assign(__assign({}, result), updateField)) : result;
            }) })); }) });
};
exports.updateInfiniteQuerySingleResultById = updateInfiniteQuerySingleResultById;
var infiniteQueryUpdateAllResults = function (_a) {
    var data = _a.data, updateField = _a.updateField;
    return __assign(__assign({}, data), { pages: data.pages.map(function (page) { return (__assign(__assign({}, page), { results: page.results.map(function (result) { return (__assign(__assign({}, result), updateField)); }) })); }) });
};
exports.infiniteQueryUpdateAllResults = infiniteQueryUpdateAllResults;
var infiniteQueryAppendResultAtTop = function (_a) {
    var data = _a.data, newData = _a.newData;
    return __assign(__assign({}, data), { pages: data.pages.map(function (page, i) { return (__assign(__assign({}, page), { results: __spreadArray([i === 0 && newData], page.results, true) })); }) });
};
exports.infiniteQueryAppendResultAtTop = infiniteQueryAppendResultAtTop;
