"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFromText = void 0;
const extractFromText = (text, regex) => {
    const matches = text.match(regex);
    const lastIndex = matches.length - 1;
    return matches[lastIndex];
};
exports.extractFromText = extractFromText;
//# sourceMappingURL=regex.util.js.map