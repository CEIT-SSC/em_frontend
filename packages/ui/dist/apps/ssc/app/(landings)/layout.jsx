"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var Navbar_1 = __importDefault(require("./components/Navbar/Navbar"));
var Footer_1 = __importDefault(require("../components/Footer"));
function RootLayout(_a) {
    var children = _a.children;
    return (<>
      <Navbar_1.default />
      {children}
      <Footer_1.default />
    </>);
}
