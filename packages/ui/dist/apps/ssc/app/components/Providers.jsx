"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var next_1 = require("@bprogress/next");
var Providers = function (_a) {
    var children = _a.children;
    return (<next_1.AppProgressProvider height="4px" options={{ showSpinner: true }} shallowRouting>
      {children}
    </next_1.AppProgressProvider>);
};
exports.default = Providers;
