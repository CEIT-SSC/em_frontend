"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var link_1 = __importDefault(require("next/link"));
var fa_1 = require("react-icons/fa");
var TeamMemberCard = function (_a) {
    var name = _a.name, position = _a.position, photoUrl = _a.photoUrl, githubUrl = _a.githubUrl, linkedinUrl = _a.linkedinUrl;
    return (<div className="w-96 border rounded-3xl overflow-hidden">
      <div className="relative h-1/2 min-h-44">
        <div className="h-3/4 default-gradient flex justify-center items-end"/>
        <image_1.default width={200} height={200} src={photoUrl} alt="member photo" className="absolute top-1/2 left-1/2 translate-[-50%] w-36 h-36 rounded-full object-cover border-2 border-mainWhite"/>
      </div>
      <div className="flex flex-col gap-2.5 py-4 px-4">
        <div className="flex flex-col justify-between items-center gap-4">
          <h4 className="text-4xl font-semibold text-mainWhite">{name}</h4>
          <p className="text-whiteText font-semibold">{position}</p>
        </div>
        <div className="relative flex justify-center gap-4 text-2xl py-4">
          <div className="absolute w-full h-0.5 bg-whiteText opacity-20 top-1/2 -translate-y-1/2 -z-1"></div>
          {githubUrl && (<link_1.default href={githubUrl} target="_blank" className="bg-background p-2 border-1 border-white rounded-full flex">
              <fa_1.FaGithub />
            </link_1.default>)}
          {linkedinUrl && (<link_1.default href={linkedinUrl} target="_blank" className="bg-background p-2 border-1 border-white rounded-full flex">
              <fa_1.FaLinkedin />
            </link_1.default>)}
        </div>
      </div>
    </div>);
};
exports.default = TeamMemberCard;
