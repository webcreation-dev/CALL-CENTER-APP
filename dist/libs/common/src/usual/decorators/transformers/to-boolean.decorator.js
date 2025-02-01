"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
const toBoolean = (value) => {
    switch (value) {
        case null:
            return 'Failure';
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
};
const ToBoolean = () => (0, class_transformer_1.Transform)(({ obj, key }) => toBoolean(obj[key]));
exports.ToBoolean = ToBoolean;
//# sourceMappingURL=to-boolean.decorator.js.map