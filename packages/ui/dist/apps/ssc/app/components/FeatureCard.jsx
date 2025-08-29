"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeatureCard = function (_a) {
    var Icon = _a.icon, title = _a.title, description = _a.description;
    return (<div className="w-full p-2 flex flex-col justify-between gap-4 overflow-hidden">
      <Icon size={48}/>
      <h3 className="text-3xl font-bold text-center">{title}</h3>
      <p className="text-2xl text-whiteText text-center">{description}</p>
    </div>);
};
exports.default = FeatureCard;
