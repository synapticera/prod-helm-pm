module.exports = [
"[project]/x-project/proto/app/node_modules/@ai-sdk/provider/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AISDKError",
    ()=>AISDKError,
    "APICallError",
    ()=>APICallError,
    "EmptyResponseBodyError",
    ()=>EmptyResponseBodyError,
    "InvalidArgumentError",
    ()=>InvalidArgumentError,
    "InvalidPromptError",
    ()=>InvalidPromptError,
    "InvalidResponseDataError",
    ()=>InvalidResponseDataError,
    "JSONParseError",
    ()=>JSONParseError,
    "LoadAPIKeyError",
    ()=>LoadAPIKeyError,
    "LoadSettingError",
    ()=>LoadSettingError,
    "NoContentGeneratedError",
    ()=>NoContentGeneratedError,
    "NoSuchModelError",
    ()=>NoSuchModelError,
    "TooManyEmbeddingValuesForCallError",
    ()=>TooManyEmbeddingValuesForCallError,
    "TypeValidationError",
    ()=>TypeValidationError,
    "UnsupportedFunctionalityError",
    ()=>UnsupportedFunctionalityError,
    "getErrorMessage",
    ()=>getErrorMessage,
    "isJSONArray",
    ()=>isJSONArray,
    "isJSONObject",
    ()=>isJSONObject,
    "isJSONValue",
    ()=>isJSONValue
]);
// src/errors/ai-sdk-error.ts
var marker = "vercel.ai.error";
var symbol = Symbol.for(marker);
var _a;
var _AISDKError = class _AISDKError extends Error {
    /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */ constructor({ name: name14, message, cause }){
        super(message);
        this[_a] = true;
        this.name = name14;
        this.cause = cause;
    }
    /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */ static isInstance(error) {
        return _AISDKError.hasMarker(error, marker);
    }
    static hasMarker(error, marker15) {
        const markerSymbol = Symbol.for(marker15);
        return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
    }
    /**
   * Returns a JSON representation of the error.
   * @returns {Object} An object containing the error's name, message, and cause.
   *
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message
        };
    }
};
_a = symbol;
var AISDKError = _AISDKError;
// src/errors/api-call-error.ts
var name = "AI_APICallError";
var marker2 = `vercel.ai.error.${name}`;
var symbol2 = Symbol.for(marker2);
var _a2;
var APICallError = class extends AISDKError {
    constructor({ message, url, requestBodyValues, statusCode, responseHeaders, responseBody, cause, isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500), // server error
    data }){
        super({
            name,
            message,
            cause
        });
        this[_a2] = true;
        this.url = url;
        this.requestBodyValues = requestBodyValues;
        this.statusCode = statusCode;
        this.responseHeaders = responseHeaders;
        this.responseBody = responseBody;
        this.isRetryable = isRetryable;
        this.data = data;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker2);
    }
    /**
   * @deprecated Use isInstance instead.
   */ static isAPICallError(error) {
        return error instanceof Error && error.name === name && typeof error.url === "string" && typeof error.requestBodyValues === "object" && (error.statusCode == null || typeof error.statusCode === "number") && (error.responseHeaders == null || typeof error.responseHeaders === "object") && (error.responseBody == null || typeof error.responseBody === "string") && (error.cause == null || typeof error.cause === "object") && typeof error.isRetryable === "boolean" && (error.data == null || typeof error.data === "object");
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            url: this.url,
            requestBodyValues: this.requestBodyValues,
            statusCode: this.statusCode,
            responseHeaders: this.responseHeaders,
            responseBody: this.responseBody,
            cause: this.cause,
            isRetryable: this.isRetryable,
            data: this.data
        };
    }
};
_a2 = symbol2;
// src/errors/empty-response-body-error.ts
var name2 = "AI_EmptyResponseBodyError";
var marker3 = `vercel.ai.error.${name2}`;
var symbol3 = Symbol.for(marker3);
var _a3;
var EmptyResponseBodyError = class extends AISDKError {
    // used in isInstance
    constructor({ message = "Empty response body" } = {}){
        super({
            name: name2,
            message
        });
        this[_a3] = true;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker3);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isEmptyResponseBodyError(error) {
        return error instanceof Error && error.name === name2;
    }
};
_a3 = symbol3;
// src/errors/get-error-message.ts
function getErrorMessage(error) {
    if (error == null) {
        return "unknown error";
    }
    if (typeof error === "string") {
        return error;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return JSON.stringify(error);
}
// src/errors/invalid-argument-error.ts
var name3 = "AI_InvalidArgumentError";
var marker4 = `vercel.ai.error.${name3}`;
var symbol4 = Symbol.for(marker4);
var _a4;
var InvalidArgumentError = class extends AISDKError {
    constructor({ message, cause, argument }){
        super({
            name: name3,
            message,
            cause
        });
        this[_a4] = true;
        this.argument = argument;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker4);
    }
};
_a4 = symbol4;
// src/errors/invalid-prompt-error.ts
var name4 = "AI_InvalidPromptError";
var marker5 = `vercel.ai.error.${name4}`;
var symbol5 = Symbol.for(marker5);
var _a5;
var InvalidPromptError = class extends AISDKError {
    constructor({ prompt: prompt2, message, cause }){
        super({
            name: name4,
            message: `Invalid prompt: ${message}`,
            cause
        });
        this[_a5] = true;
        this.prompt = prompt2;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker5);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isInvalidPromptError(error) {
        return error instanceof Error && error.name === name4 && prompt != null;
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            prompt: this.prompt
        };
    }
};
_a5 = symbol5;
// src/errors/invalid-response-data-error.ts
var name5 = "AI_InvalidResponseDataError";
var marker6 = `vercel.ai.error.${name5}`;
var symbol6 = Symbol.for(marker6);
var _a6;
var InvalidResponseDataError = class extends AISDKError {
    constructor({ data, message = `Invalid response data: ${JSON.stringify(data)}.` }){
        super({
            name: name5,
            message
        });
        this[_a6] = true;
        this.data = data;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker6);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isInvalidResponseDataError(error) {
        return error instanceof Error && error.name === name5 && error.data != null;
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            data: this.data
        };
    }
};
_a6 = symbol6;
// src/errors/json-parse-error.ts
var name6 = "AI_JSONParseError";
var marker7 = `vercel.ai.error.${name6}`;
var symbol7 = Symbol.for(marker7);
var _a7;
var JSONParseError = class extends AISDKError {
    constructor({ text, cause }){
        super({
            name: name6,
            message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage(cause)}`,
            cause
        });
        this[_a7] = true;
        this.text = text;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker7);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isJSONParseError(error) {
        return error instanceof Error && error.name === name6 && "text" in error && typeof error.text === "string";
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            cause: this.cause,
            stack: this.stack,
            valueText: this.text
        };
    }
};
_a7 = symbol7;
// src/errors/load-api-key-error.ts
var name7 = "AI_LoadAPIKeyError";
var marker8 = `vercel.ai.error.${name7}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var LoadAPIKeyError = class extends AISDKError {
    // used in isInstance
    constructor({ message }){
        super({
            name: name7,
            message
        });
        this[_a8] = true;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker8);
    }
    /**
   * @deprecated Use isInstance instead.
   */ static isLoadAPIKeyError(error) {
        return error instanceof Error && error.name === name7;
    }
};
_a8 = symbol8;
// src/errors/load-setting-error.ts
var name8 = "AI_LoadSettingError";
var marker9 = `vercel.ai.error.${name8}`;
var symbol9 = Symbol.for(marker9);
var _a9;
var LoadSettingError = class extends AISDKError {
    // used in isInstance
    constructor({ message }){
        super({
            name: name8,
            message
        });
        this[_a9] = true;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker9);
    }
    /**
   * @deprecated Use isInstance instead.
   */ static isLoadSettingError(error) {
        return error instanceof Error && error.name === name8;
    }
};
_a9 = symbol9;
// src/errors/no-content-generated-error.ts
var name9 = "AI_NoContentGeneratedError";
var marker10 = `vercel.ai.error.${name9}`;
var symbol10 = Symbol.for(marker10);
var _a10;
var NoContentGeneratedError = class extends AISDKError {
    // used in isInstance
    constructor({ message = "No content generated." } = {}){
        super({
            name: name9,
            message
        });
        this[_a10] = true;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker10);
    }
    /**
   * @deprecated Use isInstance instead.
   */ static isNoContentGeneratedError(error) {
        return error instanceof Error && error.name === name9;
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            cause: this.cause,
            message: this.message,
            stack: this.stack
        };
    }
};
_a10 = symbol10;
// src/errors/no-such-model-error.ts
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11;
var NoSuchModelError = class extends AISDKError {
    constructor({ errorName = name10, modelId, modelType, message = `No such ${modelType}: ${modelId}` }){
        super({
            name: errorName,
            message
        });
        this[_a11] = true;
        this.modelId = modelId;
        this.modelType = modelType;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker11);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isNoSuchModelError(error) {
        return error instanceof Error && error.name === name10 && typeof error.modelId === "string" && typeof error.modelType === "string";
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            modelId: this.modelId,
            modelType: this.modelType
        };
    }
};
_a11 = symbol11;
// src/errors/too-many-embedding-values-for-call-error.ts
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12;
var TooManyEmbeddingValuesForCallError = class extends AISDKError {
    constructor(options){
        super({
            name: name11,
            message: `Too many values for a single embedding call. The ${options.provider} model "${options.modelId}" can only embed up to ${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`
        });
        this[_a12] = true;
        this.provider = options.provider;
        this.modelId = options.modelId;
        this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
        this.values = options.values;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker12);
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isTooManyEmbeddingValuesForCallError(error) {
        return error instanceof Error && error.name === name11 && "provider" in error && typeof error.provider === "string" && "modelId" in error && typeof error.modelId === "string" && "maxEmbeddingsPerCall" in error && typeof error.maxEmbeddingsPerCall === "number" && "values" in error && Array.isArray(error.values);
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            provider: this.provider,
            modelId: this.modelId,
            maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
            values: this.values
        };
    }
};
_a12 = symbol12;
// src/errors/type-validation-error.ts
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var _TypeValidationError = class _TypeValidationError extends AISDKError {
    constructor({ value, cause }){
        super({
            name: name12,
            message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage(cause)}`,
            cause
        });
        this[_a13] = true;
        this.value = value;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker13);
    }
    /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */ static wrap({ value, cause }) {
        return _TypeValidationError.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError({
            value,
            cause
        });
    }
    /**
   * @deprecated use `isInstance` instead
   */ static isTypeValidationError(error) {
        return error instanceof Error && error.name === name12;
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            cause: this.cause,
            stack: this.stack,
            value: this.value
        };
    }
};
_a13 = symbol13;
var TypeValidationError = _TypeValidationError;
// src/errors/unsupported-functionality-error.ts
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14;
var UnsupportedFunctionalityError = class extends AISDKError {
    constructor({ functionality }){
        super({
            name: name13,
            message: `'${functionality}' functionality not supported.`
        });
        this[_a14] = true;
        this.functionality = functionality;
    }
    static isInstance(error) {
        return AISDKError.hasMarker(error, marker14);
    }
    /**
   * @deprecated Use isInstance instead.
   */ static isUnsupportedFunctionalityError(error) {
        return error instanceof Error && error.name === name13 && typeof error.functionality === "string";
    }
    /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */ toJSON() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            functionality: this.functionality
        };
    }
};
_a14 = symbol14;
// src/json-value/is-json.ts
function isJSONValue(value) {
    if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isJSONValue);
    }
    if (typeof value === "object") {
        return Object.entries(value).every(([key, val])=>typeof key === "string" && isJSONValue(val));
    }
    return false;
}
function isJSONArray(value) {
    return Array.isArray(value) && value.every(isJSONValue);
}
function isJSONObject(value) {
    return value != null && typeof value === "object" && Object.entries(value).every(([key, val])=>typeof key === "string" && isJSONValue(val));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/x-project/proto/app/node_modules/nanoid/non-secure/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customAlphabet",
    ()=>customAlphabet,
    "nanoid",
    ()=>nanoid
]);
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let customAlphabet = (alphabet, defaultSize = 21)=>{
    return (size = defaultSize)=>{
        let id = '';
        let i = size | 0;
        while(i--){
            id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
    };
};
let nanoid = (size = 21)=>{
    let id = '';
    let i = size | 0;
    while(i--){
        id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
};
;
}),
"[project]/x-project/proto/app/node_modules/secure-json-parse/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const hasBuffer = typeof Buffer !== 'undefined';
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function _parse(text, reviver, options) {
    // Normalize arguments
    if (options == null) {
        if (reviver !== null && typeof reviver === 'object') {
            options = reviver;
            reviver = undefined;
        }
    }
    if (hasBuffer && Buffer.isBuffer(text)) {
        text = text.toString();
    }
    // BOM checker
    if (text && text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
    }
    // Parse normally, allowing exceptions
    const obj = JSON.parse(text, reviver);
    // Ignore null and non-objects
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const protoAction = options && options.protoAction || 'error';
    const constructorAction = options && options.constructorAction || 'error';
    // options: 'error' (default) / 'remove' / 'ignore'
    if (protoAction === 'ignore' && constructorAction === 'ignore') {
        return obj;
    }
    if (protoAction !== 'ignore' && constructorAction !== 'ignore') {
        if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
            return obj;
        }
    } else if (protoAction !== 'ignore' && constructorAction === 'ignore') {
        if (suspectProtoRx.test(text) === false) {
            return obj;
        }
    } else {
        if (suspectConstructorRx.test(text) === false) {
            return obj;
        }
    }
    // Scan result for proto keys
    return filter(obj, {
        protoAction,
        constructorAction,
        safe: options && options.safe
    });
}
function filter(obj, { protoAction = 'error', constructorAction = 'error', safe } = {}) {
    let next = [
        obj
    ];
    while(next.length){
        const nodes = next;
        next = [];
        for (const node of nodes){
            if (protoAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, '__proto__')) {
                if (safe === true) {
                    return null;
                } else if (protoAction === 'error') {
                    throw new SyntaxError('Object contains forbidden prototype property');
                }
                delete node.__proto__; // eslint-disable-line no-proto
            }
            if (constructorAction !== 'ignore' && Object.prototype.hasOwnProperty.call(node, 'constructor') && Object.prototype.hasOwnProperty.call(node.constructor, 'prototype')) {
                if (safe === true) {
                    return null;
                } else if (constructorAction === 'error') {
                    throw new SyntaxError('Object contains forbidden prototype property');
                }
                delete node.constructor;
            }
            for(const key in node){
                const value = node[key];
                if (value && typeof value === 'object') {
                    next.push(value);
                }
            }
        }
    }
    return obj;
}
function parse(text, reviver, options) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
        return _parse(text, reviver, options);
    } finally{
        Error.stackTraceLimit = stackTraceLimit;
    }
}
function safeParse(text, reviver) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
        return _parse(text, reviver, {
            safe: true
        });
    } catch (_e) {
        return null;
    } finally{
        Error.stackTraceLimit = stackTraceLimit;
    }
}
module.exports = parse;
module.exports.default = parse;
module.exports.parse = parse;
module.exports.safeParse = safeParse;
module.exports.scan = filter;
}),
"[project]/x-project/proto/app/node_modules/eventsource-parser/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createParser",
    ()=>createParser
]);
function createParser(onParse) {
    let isFirstChunk;
    let buffer;
    let startingPosition;
    let startingFieldLength;
    let eventId;
    let eventName;
    let data;
    reset();
    return {
        feed,
        reset
    };
    //TURBOPACK unreachable
    ;
    function reset() {
        isFirstChunk = true;
        buffer = "";
        startingPosition = 0;
        startingFieldLength = -1;
        eventId = void 0;
        eventName = void 0;
        data = "";
    }
    function feed(chunk) {
        buffer = buffer ? buffer + chunk : chunk;
        if (isFirstChunk && hasBom(buffer)) {
            buffer = buffer.slice(BOM.length);
        }
        isFirstChunk = false;
        const length = buffer.length;
        let position = 0;
        let discardTrailingNewline = false;
        while(position < length){
            if (discardTrailingNewline) {
                if (buffer[position] === "\n") {
                    ++position;
                }
                discardTrailingNewline = false;
            }
            let lineLength = -1;
            let fieldLength = startingFieldLength;
            let character;
            for(let index = startingPosition; lineLength < 0 && index < length; ++index){
                character = buffer[index];
                if (character === ":" && fieldLength < 0) {
                    fieldLength = index - position;
                } else if (character === "\r") {
                    discardTrailingNewline = true;
                    lineLength = index - position;
                } else if (character === "\n") {
                    lineLength = index - position;
                }
            }
            if (lineLength < 0) {
                startingPosition = length - position;
                startingFieldLength = fieldLength;
                break;
            } else {
                startingPosition = 0;
                startingFieldLength = -1;
            }
            parseEventStreamLine(buffer, position, fieldLength, lineLength);
            position += lineLength + 1;
        }
        if (position === length) {
            buffer = "";
        } else if (position > 0) {
            buffer = buffer.slice(position);
        }
    }
    function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
        if (lineLength === 0) {
            if (data.length > 0) {
                onParse({
                    type: "event",
                    id: eventId,
                    event: eventName || void 0,
                    data: data.slice(0, -1)
                });
                data = "";
                eventId = void 0;
            }
            eventName = void 0;
            return;
        }
        const noValue = fieldLength < 0;
        const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
        let step = 0;
        if (noValue) {
            step = lineLength;
        } else if (lineBuffer[index + fieldLength + 1] === " ") {
            step = fieldLength + 2;
        } else {
            step = fieldLength + 1;
        }
        const position = index + step;
        const valueLength = lineLength - step;
        const value = lineBuffer.slice(position, position + valueLength).toString();
        if (field === "data") {
            data += value ? "".concat(value, "\n") : "\n";
        } else if (field === "event") {
            eventName = value;
        } else if (field === "id" && !value.includes("\0")) {
            eventId = value;
        } else if (field === "retry") {
            const retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
                onParse({
                    type: "reconnect-interval",
                    value: retry
                });
            }
        }
    }
}
const BOM = [
    239,
    187,
    191
];
function hasBom(buffer) {
    return BOM.every((charCode, index)=>buffer.charCodeAt(index) === charCode);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/x-project/proto/app/node_modules/eventsource-parser/dist/stream.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventSourceParserStream",
    ()=>EventSourceParserStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/eventsource-parser/dist/index.js [app-route] (ecmascript)");
;
class EventSourceParserStream extends TransformStream {
    constructor(){
        let parser;
        super({
            start (controller) {
                parser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createParser"])((event)=>{
                    if (event.type === "event") {
                        controller.enqueue(event);
                    }
                });
            },
            transform (chunk) {
                parser.feed(chunk);
            }
        });
    }
}
;
 //# sourceMappingURL=stream.js.map
}),
"[project]/x-project/proto/app/node_modules/@ai-sdk/provider-utils/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asValidator",
    ()=>asValidator,
    "combineHeaders",
    ()=>combineHeaders,
    "convertAsyncGeneratorToReadableStream",
    ()=>convertAsyncGeneratorToReadableStream,
    "convertBase64ToUint8Array",
    ()=>convertBase64ToUint8Array,
    "convertUint8ArrayToBase64",
    ()=>convertUint8ArrayToBase64,
    "createEventSourceResponseHandler",
    ()=>createEventSourceResponseHandler,
    "createIdGenerator",
    ()=>createIdGenerator,
    "createJsonErrorResponseHandler",
    ()=>createJsonErrorResponseHandler,
    "createJsonResponseHandler",
    ()=>createJsonResponseHandler,
    "createJsonStreamResponseHandler",
    ()=>createJsonStreamResponseHandler,
    "extractResponseHeaders",
    ()=>extractResponseHeaders,
    "generateId",
    ()=>generateId,
    "getErrorMessage",
    ()=>getErrorMessage,
    "isAbortError",
    ()=>isAbortError,
    "isParsableJson",
    ()=>isParsableJson,
    "isParseableJson",
    ()=>isParseableJson,
    "isValidator",
    ()=>isValidator,
    "loadApiKey",
    ()=>loadApiKey,
    "loadOptionalSetting",
    ()=>loadOptionalSetting,
    "loadSetting",
    ()=>loadSetting,
    "parseJSON",
    ()=>parseJSON,
    "postJsonToApi",
    ()=>postJsonToApi,
    "postToApi",
    ()=>postToApi,
    "safeParseJSON",
    ()=>safeParseJSON,
    "safeValidateTypes",
    ()=>safeValidateTypes,
    "validateTypes",
    ()=>validateTypes,
    "validator",
    ()=>validator,
    "validatorSymbol",
    ()=>validatorSymbol,
    "withoutTrailingSlash",
    ()=>withoutTrailingSlash,
    "zodValidator",
    ()=>zodValidator
]);
// src/generate-id.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/@ai-sdk/provider/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$nanoid$2f$non$2d$secure$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/nanoid/non-secure/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/secure-json-parse/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/eventsource-parser/dist/stream.js [app-route] (ecmascript)");
// src/combine-headers.ts
function combineHeaders(...headers) {
    return headers.reduce((combinedHeaders, currentHeaders)=>({
            ...combinedHeaders,
            ...currentHeaders != null ? currentHeaders : {}
        }), {});
}
// src/convert-async-generator-to-readable-stream.ts
function convertAsyncGeneratorToReadableStream(stream) {
    return new ReadableStream({
        /**
     * Called when the consumer wants to pull more data from the stream.
     *
     * @param {ReadableStreamDefaultController<T>} controller - The controller to enqueue data into the stream.
     * @returns {Promise<void>}
     */ async pull (controller) {
            try {
                const { value, done } = await stream.next();
                if (done) {
                    controller.close();
                } else {
                    controller.enqueue(value);
                }
            } catch (error) {
                controller.error(error);
            }
        },
        /**
     * Called when the consumer cancels the stream.
     */ cancel () {}
    });
}
// src/extract-response-headers.ts
function extractResponseHeaders(response) {
    const headers = {};
    response.headers.forEach((value, key)=>{
        headers[key] = value;
    });
    return headers;
}
;
;
var createIdGenerator = ({ prefix, size: defaultSize = 7, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", separator = "-" } = {})=>{
    const generator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$nanoid$2f$non$2d$secure$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customAlphabet"])(alphabet, defaultSize);
    if (prefix == null) {
        return generator;
    }
    if (alphabet.includes(separator)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidArgumentError"]({
            argument: "separator",
            message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
        });
    }
    return (size)=>`${prefix}${separator}${generator(size)}`;
};
var generateId = createIdGenerator();
// src/get-error-message.ts
function getErrorMessage(error) {
    if (error == null) {
        return "unknown error";
    }
    if (typeof error === "string") {
        return error;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return JSON.stringify(error);
}
// src/is-abort-error.ts
function isAbortError(error) {
    return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
;
function loadApiKey({ apiKey, environmentVariableName, apiKeyParameterName = "apiKey", description }) {
    if (typeof apiKey === "string") {
        return apiKey;
    }
    if (apiKey != null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadAPIKeyError"]({
            message: `${description} API key must be a string.`
        });
    }
    if (typeof process === "undefined") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadAPIKeyError"]({
            message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.`
        });
    }
    apiKey = process.env[environmentVariableName];
    if (apiKey == null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadAPIKeyError"]({
            message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.`
        });
    }
    if (typeof apiKey !== "string") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadAPIKeyError"]({
            message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
        });
    }
    return apiKey;
}
;
function loadSetting({ settingValue, environmentVariableName, settingName, description }) {
    if (typeof settingValue === "string") {
        return settingValue;
    }
    if (settingValue != null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadSettingError"]({
            message: `${description} setting must be a string.`
        });
    }
    if (typeof process === "undefined") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadSettingError"]({
            message: `${description} setting is missing. Pass it using the '${settingName}' parameter. Environment variables is not supported in this environment.`
        });
    }
    settingValue = process.env[environmentVariableName];
    if (settingValue == null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadSettingError"]({
            message: `${description} setting is missing. Pass it using the '${settingName}' parameter or the ${environmentVariableName} environment variable.`
        });
    }
    if (typeof settingValue !== "string") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LoadSettingError"]({
            message: `${description} setting must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
        });
    }
    return settingValue;
}
// src/load-optional-setting.ts
function loadOptionalSetting({ settingValue, environmentVariableName }) {
    if (typeof settingValue === "string") {
        return settingValue;
    }
    if (settingValue != null || typeof process === "undefined") {
        return void 0;
    }
    settingValue = process.env[environmentVariableName];
    if (settingValue == null || typeof settingValue !== "string") {
        return void 0;
    }
    return settingValue;
}
;
;
;
// src/validator.ts
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
    return {
        [validatorSymbol]: true,
        validate
    };
}
function isValidator(value) {
    return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
function asValidator(value) {
    return isValidator(value) ? value : zodValidator(value);
}
function zodValidator(zodSchema) {
    return validator((value)=>{
        const result = zodSchema.safeParse(value);
        return result.success ? {
            success: true,
            value: result.data
        } : {
            success: false,
            error: result.error
        };
    });
}
// src/validate-types.ts
function validateTypes({ value, schema: inputSchema }) {
    const result = safeValidateTypes({
        value,
        schema: inputSchema
    });
    if (!result.success) {
        throw __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeValidationError"].wrap({
            value,
            cause: result.error
        });
    }
    return result.value;
}
function safeValidateTypes({ value, schema }) {
    const validator2 = asValidator(schema);
    try {
        if (validator2.validate == null) {
            return {
                success: true,
                value
            };
        }
        const result = validator2.validate(value);
        if (result.success) {
            return result;
        }
        return {
            success: false,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeValidationError"].wrap({
                value,
                cause: result.error
            })
        };
    } catch (error) {
        return {
            success: false,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeValidationError"].wrap({
                value,
                cause: error
            })
        };
    }
}
// src/parse-json.ts
function parseJSON({ text, schema }) {
    try {
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(text);
        if (schema == null) {
            return value;
        }
        return validateTypes({
            value,
            schema
        });
    } catch (error) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONParseError"].isJSONParseError(error) || __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeValidationError"].isTypeValidationError(error)) {
            throw error;
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONParseError"]({
            text,
            cause: error
        });
    }
}
function safeParseJSON({ text, schema }) {
    try {
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(text);
        if (schema == null) {
            return {
                success: true,
                value
            };
        }
        return safeValidateTypes({
            value,
            schema
        });
    } catch (error) {
        return {
            success: false,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONParseError"].isJSONParseError(error) ? error : new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONParseError"]({
                text,
                cause: error
            })
        };
    }
}
function isParsableJson(input) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(input);
        return true;
    } catch (e) {
        return false;
    }
}
var isParseableJson = isParsableJson;
;
// src/remove-undefined-entries.ts
function removeUndefinedEntries(record) {
    return Object.fromEntries(Object.entries(record).filter(([_key, value])=>value != null));
}
// src/post-to-api.ts
var getOriginalFetch = ()=>globalThis.fetch;
var postJsonToApi = async ({ url, headers, body, failedResponseHandler, successfulResponseHandler, abortSignal, fetch })=>postToApi({
        url,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: {
            content: JSON.stringify(body),
            values: body
        },
        failedResponseHandler,
        successfulResponseHandler,
        abortSignal,
        fetch
    });
var postToApi = async ({ url, headers = {}, body, successfulResponseHandler, failedResponseHandler, abortSignal, fetch = getOriginalFetch() })=>{
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: removeUndefinedEntries(headers),
            body: body.content,
            signal: abortSignal
        });
        const responseHeaders = extractResponseHeaders(response);
        if (!response.ok) {
            let errorInformation;
            try {
                errorInformation = await failedResponseHandler({
                    response,
                    url,
                    requestBodyValues: body.values
                });
            } catch (error) {
                if (isAbortError(error) || __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"].isAPICallError(error)) {
                    throw error;
                }
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                    message: "Failed to process error response",
                    cause: error,
                    statusCode: response.status,
                    url,
                    responseHeaders,
                    requestBodyValues: body.values
                });
            }
            throw errorInformation.value;
        }
        try {
            return await successfulResponseHandler({
                response,
                url,
                requestBodyValues: body.values
            });
        } catch (error) {
            if (error instanceof Error) {
                if (isAbortError(error) || __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"].isAPICallError(error)) {
                    throw error;
                }
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                message: "Failed to process successful response",
                cause: error,
                statusCode: response.status,
                url,
                responseHeaders,
                requestBodyValues: body.values
            });
        }
    } catch (error) {
        if (isAbortError(error)) {
            throw error;
        }
        if (error instanceof TypeError && error.message === "fetch failed") {
            const cause = error.cause;
            if (cause != null) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                    message: `Cannot connect to API: ${cause.message}`,
                    cause,
                    url,
                    requestBodyValues: body.values,
                    isRetryable: true
                });
            }
        }
        throw error;
    }
};
;
;
var createJsonErrorResponseHandler = ({ errorSchema, errorToMessage, isRetryable })=>async ({ response, url, requestBodyValues })=>{
        const responseBody = await response.text();
        const responseHeaders = extractResponseHeaders(response);
        if (responseBody.trim() === "") {
            return {
                responseHeaders,
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                    message: response.statusText,
                    url,
                    requestBodyValues,
                    statusCode: response.status,
                    responseHeaders,
                    responseBody,
                    isRetryable: isRetryable == null ? void 0 : isRetryable(response)
                })
            };
        }
        try {
            const parsedError = parseJSON({
                text: responseBody,
                schema: errorSchema
            });
            return {
                responseHeaders,
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                    message: errorToMessage(parsedError),
                    url,
                    requestBodyValues,
                    statusCode: response.status,
                    responseHeaders,
                    responseBody,
                    data: parsedError,
                    isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
                })
            };
        } catch (parseError) {
            return {
                responseHeaders,
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                    message: response.statusText,
                    url,
                    requestBodyValues,
                    statusCode: response.status,
                    responseHeaders,
                    responseBody,
                    isRetryable: isRetryable == null ? void 0 : isRetryable(response)
                })
            };
        }
    };
var createEventSourceResponseHandler = (chunkSchema)=>async ({ response })=>{
        const responseHeaders = extractResponseHeaders(response);
        if (response.body == null) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EmptyResponseBodyError"]({});
        }
        return {
            responseHeaders,
            value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$eventsource$2d$parser$2f$dist$2f$stream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventSourceParserStream"]()).pipeThrough(new TransformStream({
                transform ({ data }, controller) {
                    if (data === "[DONE]") {
                        return;
                    }
                    controller.enqueue(safeParseJSON({
                        text: data,
                        schema: chunkSchema
                    }));
                }
            }))
        };
    };
var createJsonStreamResponseHandler = (chunkSchema)=>async ({ response })=>{
        const responseHeaders = extractResponseHeaders(response);
        if (response.body == null) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EmptyResponseBodyError"]({});
        }
        let buffer = "";
        return {
            responseHeaders,
            value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new TransformStream({
                transform (chunkText, controller) {
                    if (chunkText.endsWith("\n")) {
                        controller.enqueue(safeParseJSON({
                            text: buffer + chunkText,
                            schema: chunkSchema
                        }));
                        buffer = "";
                    } else {
                        buffer += chunkText;
                    }
                }
            }))
        };
    };
var createJsonResponseHandler = (responseSchema)=>async ({ response, url, requestBodyValues })=>{
        const responseBody = await response.text();
        const parsedResult = safeParseJSON({
            text: responseBody,
            schema: responseSchema
        });
        const responseHeaders = extractResponseHeaders(response);
        if (!parsedResult.success) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APICallError"]({
                message: "Invalid JSON response",
                cause: parsedResult.error,
                statusCode: response.status,
                responseHeaders,
                responseBody,
                url,
                requestBodyValues
            });
        }
        return {
            responseHeaders,
            value: parsedResult.value
        };
    };
// src/uint8-utils.ts
var { btoa, atob } = globalThis;
function convertBase64ToUint8Array(base64String) {
    const base64Url = base64String.replace(/-/g, "+").replace(/_/g, "/");
    const latin1string = atob(base64Url);
    return Uint8Array.from(latin1string, (byte)=>byte.codePointAt(0));
}
function convertUint8ArrayToBase64(array) {
    let latin1string = "";
    for(let i = 0; i < array.length; i++){
        latin1string += String.fromCodePoint(array[i]);
    }
    return btoa(latin1string);
}
// src/without-trailing-slash.ts
function withoutTrailingSlash(url) {
    return url == null ? void 0 : url.replace(/\/$/, "");
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/x-project/proto/app/node_modules/@ai-sdk/ui-utils/dist/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asSchema",
    ()=>asSchema,
    "callChatApi",
    ()=>callChatApi,
    "callCompletionApi",
    ()=>callCompletionApi,
    "createChunkDecoder",
    ()=>createChunkDecoder,
    "formatStreamPart",
    ()=>formatStreamPart,
    "getTextFromDataUrl",
    ()=>getTextFromDataUrl,
    "isDeepEqualData",
    ()=>isDeepEqualData,
    "jsonSchema",
    ()=>jsonSchema,
    "parsePartialJson",
    ()=>parsePartialJson,
    "parseStreamPart",
    ()=>parseStreamPart,
    "processChatStream",
    ()=>processChatStream,
    "processDataProtocolResponse",
    ()=>processDataProtocolResponse,
    "readDataStream",
    ()=>readDataStream,
    "zodSchema",
    ()=>zodSchema
]);
// src/index.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/@ai-sdk/provider-utils/dist/index.mjs [app-route] (ecmascript)");
// src/parse-partial-json.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/secure-json-parse/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2d$to$2d$json$2d$schema$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/zod-to-json-schema/dist/esm/index.js [app-route] (ecmascript) <locals>");
;
;
;
// src/fix-json.ts
function fixJson(input) {
    const stack = [
        "ROOT"
    ];
    let lastValidIndex = -1;
    let literalStart = null;
    function processValueStart(char, i, swapState) {
        {
            switch(char){
                case '"':
                    {
                        lastValidIndex = i;
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_STRING");
                        break;
                    }
                case "f":
                case "t":
                case "n":
                    {
                        lastValidIndex = i;
                        literalStart = i;
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_LITERAL");
                        break;
                    }
                case "-":
                    {
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_NUMBER");
                        break;
                    }
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    {
                        lastValidIndex = i;
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_NUMBER");
                        break;
                    }
                case "{":
                    {
                        lastValidIndex = i;
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_OBJECT_START");
                        break;
                    }
                case "[":
                    {
                        lastValidIndex = i;
                        stack.pop();
                        stack.push(swapState);
                        stack.push("INSIDE_ARRAY_START");
                        break;
                    }
            }
        }
    }
    function processAfterObjectValue(char, i) {
        switch(char){
            case ",":
                {
                    stack.pop();
                    stack.push("INSIDE_OBJECT_AFTER_COMMA");
                    break;
                }
            case "}":
                {
                    lastValidIndex = i;
                    stack.pop();
                    break;
                }
        }
    }
    function processAfterArrayValue(char, i) {
        switch(char){
            case ",":
                {
                    stack.pop();
                    stack.push("INSIDE_ARRAY_AFTER_COMMA");
                    break;
                }
            case "]":
                {
                    lastValidIndex = i;
                    stack.pop();
                    break;
                }
        }
    }
    for(let i = 0; i < input.length; i++){
        const char = input[i];
        const currentState = stack[stack.length - 1];
        switch(currentState){
            case "ROOT":
                processValueStart(char, i, "FINISH");
                break;
            case "INSIDE_OBJECT_START":
                {
                    switch(char){
                        case '"':
                            {
                                stack.pop();
                                stack.push("INSIDE_OBJECT_KEY");
                                break;
                            }
                        case "}":
                            {
                                lastValidIndex = i;
                                stack.pop();
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_OBJECT_AFTER_COMMA":
                {
                    switch(char){
                        case '"':
                            {
                                stack.pop();
                                stack.push("INSIDE_OBJECT_KEY");
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_OBJECT_KEY":
                {
                    switch(char){
                        case '"':
                            {
                                stack.pop();
                                stack.push("INSIDE_OBJECT_AFTER_KEY");
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_OBJECT_AFTER_KEY":
                {
                    switch(char){
                        case ":":
                            {
                                stack.pop();
                                stack.push("INSIDE_OBJECT_BEFORE_VALUE");
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_OBJECT_BEFORE_VALUE":
                {
                    processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
                    break;
                }
            case "INSIDE_OBJECT_AFTER_VALUE":
                {
                    processAfterObjectValue(char, i);
                    break;
                }
            case "INSIDE_STRING":
                {
                    switch(char){
                        case '"':
                            {
                                stack.pop();
                                lastValidIndex = i;
                                break;
                            }
                        case "\\":
                            {
                                stack.push("INSIDE_STRING_ESCAPE");
                                break;
                            }
                        default:
                            {
                                lastValidIndex = i;
                            }
                    }
                    break;
                }
            case "INSIDE_ARRAY_START":
                {
                    switch(char){
                        case "]":
                            {
                                lastValidIndex = i;
                                stack.pop();
                                break;
                            }
                        default:
                            {
                                lastValidIndex = i;
                                processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_ARRAY_AFTER_VALUE":
                {
                    switch(char){
                        case ",":
                            {
                                stack.pop();
                                stack.push("INSIDE_ARRAY_AFTER_COMMA");
                                break;
                            }
                        case "]":
                            {
                                lastValidIndex = i;
                                stack.pop();
                                break;
                            }
                        default:
                            {
                                lastValidIndex = i;
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_ARRAY_AFTER_COMMA":
                {
                    processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
                    break;
                }
            case "INSIDE_STRING_ESCAPE":
                {
                    stack.pop();
                    lastValidIndex = i;
                    break;
                }
            case "INSIDE_NUMBER":
                {
                    switch(char){
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                        case "5":
                        case "6":
                        case "7":
                        case "8":
                        case "9":
                            {
                                lastValidIndex = i;
                                break;
                            }
                        case "e":
                        case "E":
                        case "-":
                        case ".":
                            {
                                break;
                            }
                        case ",":
                            {
                                stack.pop();
                                if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
                                    processAfterArrayValue(char, i);
                                }
                                if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
                                    processAfterObjectValue(char, i);
                                }
                                break;
                            }
                        case "}":
                            {
                                stack.pop();
                                if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
                                    processAfterObjectValue(char, i);
                                }
                                break;
                            }
                        case "]":
                            {
                                stack.pop();
                                if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
                                    processAfterArrayValue(char, i);
                                }
                                break;
                            }
                        default:
                            {
                                stack.pop();
                                break;
                            }
                    }
                    break;
                }
            case "INSIDE_LITERAL":
                {
                    const partialLiteral = input.substring(literalStart, i + 1);
                    if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
                        stack.pop();
                        if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
                            processAfterObjectValue(char, i);
                        } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
                            processAfterArrayValue(char, i);
                        }
                    } else {
                        lastValidIndex = i;
                    }
                    break;
                }
        }
    }
    let result = input.slice(0, lastValidIndex + 1);
    for(let i = stack.length - 1; i >= 0; i--){
        const state = stack[i];
        switch(state){
            case "INSIDE_STRING":
                {
                    result += '"';
                    break;
                }
            case "INSIDE_OBJECT_KEY":
            case "INSIDE_OBJECT_AFTER_KEY":
            case "INSIDE_OBJECT_AFTER_COMMA":
            case "INSIDE_OBJECT_START":
            case "INSIDE_OBJECT_BEFORE_VALUE":
            case "INSIDE_OBJECT_AFTER_VALUE":
                {
                    result += "}";
                    break;
                }
            case "INSIDE_ARRAY_START":
            case "INSIDE_ARRAY_AFTER_COMMA":
            case "INSIDE_ARRAY_AFTER_VALUE":
                {
                    result += "]";
                    break;
                }
            case "INSIDE_LITERAL":
                {
                    const partialLiteral = input.substring(literalStart, input.length);
                    if ("true".startsWith(partialLiteral)) {
                        result += "true".slice(partialLiteral.length);
                    } else if ("false".startsWith(partialLiteral)) {
                        result += "false".slice(partialLiteral.length);
                    } else if ("null".startsWith(partialLiteral)) {
                        result += "null".slice(partialLiteral.length);
                    }
                }
        }
    }
    return result;
}
// src/parse-partial-json.ts
function parsePartialJson(jsonText) {
    if (jsonText === void 0) {
        return {
            value: void 0,
            state: "undefined-input"
        };
    }
    try {
        return {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(jsonText),
            state: "successful-parse"
        };
    } catch (ignored) {
        try {
            return {
                value: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$secure$2d$json$2d$parse$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(fixJson(jsonText)),
                state: "repaired-parse"
            };
        } catch (ignored2) {}
    }
    return {
        value: void 0,
        state: "failed-parse"
    };
}
// src/stream-parts.ts
var textStreamPart = {
    code: "0",
    name: "text",
    parse: (value)=>{
        if (typeof value !== "string") {
            throw new Error('"text" parts expect a string value.');
        }
        return {
            type: "text",
            value
        };
    }
};
var functionCallStreamPart = {
    code: "1",
    name: "function_call",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("function_call" in value) || typeof value.function_call !== "object" || value.function_call == null || !("name" in value.function_call) || !("arguments" in value.function_call) || typeof value.function_call.name !== "string" || typeof value.function_call.arguments !== "string") {
            throw new Error('"function_call" parts expect an object with a "function_call" property.');
        }
        return {
            type: "function_call",
            value
        };
    }
};
var dataStreamPart = {
    code: "2",
    name: "data",
    parse: (value)=>{
        if (!Array.isArray(value)) {
            throw new Error('"data" parts expect an array value.');
        }
        return {
            type: "data",
            value
        };
    }
};
var errorStreamPart = {
    code: "3",
    name: "error",
    parse: (value)=>{
        if (typeof value !== "string") {
            throw new Error('"error" parts expect a string value.');
        }
        return {
            type: "error",
            value
        };
    }
};
var assistantMessageStreamPart = {
    code: "4",
    name: "assistant_message",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("id" in value) || !("role" in value) || !("content" in value) || typeof value.id !== "string" || typeof value.role !== "string" || value.role !== "assistant" || !Array.isArray(value.content) || !value.content.every((item)=>item != null && typeof item === "object" && "type" in item && item.type === "text" && "text" in item && item.text != null && typeof item.text === "object" && "value" in item.text && typeof item.text.value === "string")) {
            throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');
        }
        return {
            type: "assistant_message",
            value
        };
    }
};
var assistantControlDataStreamPart = {
    code: "5",
    name: "assistant_control_data",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("threadId" in value) || !("messageId" in value) || typeof value.threadId !== "string" || typeof value.messageId !== "string") {
            throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');
        }
        return {
            type: "assistant_control_data",
            value: {
                threadId: value.threadId,
                messageId: value.messageId
            }
        };
    }
};
var dataMessageStreamPart = {
    code: "6",
    name: "data_message",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("role" in value) || !("data" in value) || typeof value.role !== "string" || value.role !== "data") {
            throw new Error('"data_message" parts expect an object with a "role" and "data" property.');
        }
        return {
            type: "data_message",
            value
        };
    }
};
var toolCallsStreamPart = {
    code: "7",
    name: "tool_calls",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("tool_calls" in value) || typeof value.tool_calls !== "object" || value.tool_calls == null || !Array.isArray(value.tool_calls) || value.tool_calls.some((tc)=>tc == null || typeof tc !== "object" || !("id" in tc) || typeof tc.id !== "string" || !("type" in tc) || typeof tc.type !== "string" || !("function" in tc) || tc.function == null || typeof tc.function !== "object" || !("arguments" in tc.function) || typeof tc.function.name !== "string" || typeof tc.function.arguments !== "string")) {
            throw new Error('"tool_calls" parts expect an object with a ToolCallPayload.');
        }
        return {
            type: "tool_calls",
            value
        };
    }
};
var messageAnnotationsStreamPart = {
    code: "8",
    name: "message_annotations",
    parse: (value)=>{
        if (!Array.isArray(value)) {
            throw new Error('"message_annotations" parts expect an array value.');
        }
        return {
            type: "message_annotations",
            value
        };
    }
};
var toolCallStreamPart = {
    code: "9",
    name: "tool_call",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string" || !("args" in value) || typeof value.args !== "object") {
            throw new Error('"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.');
        }
        return {
            type: "tool_call",
            value
        };
    }
};
var toolResultStreamPart = {
    code: "a",
    name: "tool_result",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("result" in value)) {
            throw new Error('"tool_result" parts expect an object with a "toolCallId" and a "result" property.');
        }
        return {
            type: "tool_result",
            value
        };
    }
};
var toolCallStreamingStartStreamPart = {
    code: "b",
    name: "tool_call_streaming_start",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string") {
            throw new Error('"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.');
        }
        return {
            type: "tool_call_streaming_start",
            value
        };
    }
};
var toolCallDeltaStreamPart = {
    code: "c",
    name: "tool_call_delta",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("argsTextDelta" in value) || typeof value.argsTextDelta !== "string") {
            throw new Error('"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.');
        }
        return {
            type: "tool_call_delta",
            value
        };
    }
};
var finishMessageStreamPart = {
    code: "d",
    name: "finish_message",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
            throw new Error('"finish_message" parts expect an object with a "finishReason" property.');
        }
        const result = {
            finishReason: value.finishReason
        };
        if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
            result.usage = {
                promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
                completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
            };
        }
        return {
            type: "finish_message",
            value: result
        };
    }
};
var finishStepStreamPart = {
    code: "e",
    name: "finish_step",
    parse: (value)=>{
        if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
            throw new Error('"finish_step" parts expect an object with a "finishReason" property.');
        }
        const result = {
            finishReason: value.finishReason,
            isContinued: false
        };
        if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
            result.usage = {
                promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
                completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
            };
        }
        if ("isContinued" in value && typeof value.isContinued === "boolean") {
            result.isContinued = value.isContinued;
        }
        return {
            type: "finish_step",
            value: result
        };
    }
};
var streamParts = [
    textStreamPart,
    functionCallStreamPart,
    dataStreamPart,
    errorStreamPart,
    assistantMessageStreamPart,
    assistantControlDataStreamPart,
    dataMessageStreamPart,
    toolCallsStreamPart,
    messageAnnotationsStreamPart,
    toolCallStreamPart,
    toolResultStreamPart,
    toolCallStreamingStartStreamPart,
    toolCallDeltaStreamPart,
    finishMessageStreamPart,
    finishStepStreamPart
];
var streamPartsByCode = {
    [textStreamPart.code]: textStreamPart,
    [functionCallStreamPart.code]: functionCallStreamPart,
    [dataStreamPart.code]: dataStreamPart,
    [errorStreamPart.code]: errorStreamPart,
    [assistantMessageStreamPart.code]: assistantMessageStreamPart,
    [assistantControlDataStreamPart.code]: assistantControlDataStreamPart,
    [dataMessageStreamPart.code]: dataMessageStreamPart,
    [toolCallsStreamPart.code]: toolCallsStreamPart,
    [messageAnnotationsStreamPart.code]: messageAnnotationsStreamPart,
    [toolCallStreamPart.code]: toolCallStreamPart,
    [toolResultStreamPart.code]: toolResultStreamPart,
    [toolCallStreamingStartStreamPart.code]: toolCallStreamingStartStreamPart,
    [toolCallDeltaStreamPart.code]: toolCallDeltaStreamPart,
    [finishMessageStreamPart.code]: finishMessageStreamPart,
    [finishStepStreamPart.code]: finishStepStreamPart
};
var StreamStringPrefixes = {
    [textStreamPart.name]: textStreamPart.code,
    [functionCallStreamPart.name]: functionCallStreamPart.code,
    [dataStreamPart.name]: dataStreamPart.code,
    [errorStreamPart.name]: errorStreamPart.code,
    [assistantMessageStreamPart.name]: assistantMessageStreamPart.code,
    [assistantControlDataStreamPart.name]: assistantControlDataStreamPart.code,
    [dataMessageStreamPart.name]: dataMessageStreamPart.code,
    [toolCallsStreamPart.name]: toolCallsStreamPart.code,
    [messageAnnotationsStreamPart.name]: messageAnnotationsStreamPart.code,
    [toolCallStreamPart.name]: toolCallStreamPart.code,
    [toolResultStreamPart.name]: toolResultStreamPart.code,
    [toolCallStreamingStartStreamPart.name]: toolCallStreamingStartStreamPart.code,
    [toolCallDeltaStreamPart.name]: toolCallDeltaStreamPart.code,
    [finishMessageStreamPart.name]: finishMessageStreamPart.code,
    [finishStepStreamPart.name]: finishStepStreamPart.code
};
var validCodes = streamParts.map((part)=>part.code);
var parseStreamPart = (line)=>{
    const firstSeparatorIndex = line.indexOf(":");
    if (firstSeparatorIndex === -1) {
        throw new Error("Failed to parse stream string. No separator found.");
    }
    const prefix = line.slice(0, firstSeparatorIndex);
    if (!validCodes.includes(prefix)) {
        throw new Error(`Failed to parse stream string. Invalid code ${prefix}.`);
    }
    const code = prefix;
    const textValue = line.slice(firstSeparatorIndex + 1);
    const jsonValue = JSON.parse(textValue);
    return streamPartsByCode[code].parse(jsonValue);
};
function formatStreamPart(type, value) {
    const streamPart = streamParts.find((part)=>part.name === type);
    if (!streamPart) {
        throw new Error(`Invalid stream part type: ${type}`);
    }
    return `${streamPart.code}:${JSON.stringify(value)}
`;
}
// src/read-data-stream.ts
var NEWLINE = "\n".charCodeAt(0);
function concatChunks(chunks, totalLength) {
    const concatenatedChunks = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks){
        concatenatedChunks.set(chunk, offset);
        offset += chunk.length;
    }
    chunks.length = 0;
    return concatenatedChunks;
}
async function* readDataStream(reader, { isAborted } = {}) {
    const decoder = new TextDecoder();
    const chunks = [];
    let totalLength = 0;
    while(true){
        const { value } = await reader.read();
        if (value) {
            chunks.push(value);
            totalLength += value.length;
            if (value[value.length - 1] !== NEWLINE) {
                continue;
            }
        }
        if (chunks.length === 0) {
            break;
        }
        const concatenatedChunks = concatChunks(chunks, totalLength);
        totalLength = 0;
        const streamParts2 = decoder.decode(concatenatedChunks, {
            stream: true
        }).split("\n").filter((line)=>line !== "").map(parseStreamPart);
        for (const streamPart of streamParts2){
            yield streamPart;
        }
        if (isAborted == null ? void 0 : isAborted()) {
            reader.cancel();
            break;
        }
    }
}
// src/process-data-protocol-response.ts
function assignAnnotationsToMessage(message, annotations) {
    if (!message || !annotations || !annotations.length) return message;
    return {
        ...message,
        annotations: [
            ...annotations
        ]
    };
}
async function processDataProtocolResponse({ reader, abortControllerRef, update, onToolCall, onFinish, generateId: generateId2 = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateId"], getCurrentDate = ()=>/* @__PURE__ */ new Date() }) {
    var _a;
    const createdAt = getCurrentDate();
    let prefixMap = {};
    let nextPrefixMap = void 0;
    const previousMessages = [];
    const data = [];
    let messageAnnotations = void 0;
    const partialToolCalls = {};
    let usage = {
        completionTokens: NaN,
        promptTokens: NaN,
        totalTokens: NaN
    };
    let finishReason = "unknown";
    for await (const { type, value } of readDataStream(reader, {
        isAborted: ()=>(abortControllerRef == null ? void 0 : abortControllerRef.current) === null
    })){
        if (type === "error") {
            throw new Error(value);
        }
        if (type === "finish_step") {
            if (!value.isContinued) {
                nextPrefixMap = {};
            }
            continue;
        }
        if (type === "finish_message") {
            finishReason = value.finishReason;
            if (value.usage != null) {
                const { completionTokens, promptTokens } = value.usage;
                usage = {
                    completionTokens,
                    promptTokens,
                    totalTokens: completionTokens + promptTokens
                };
            }
            continue;
        }
        if (nextPrefixMap != null && (type === "text" || type === "tool_call" || type === "tool_call_streaming_start" || type === "tool_call_delta" || type === "tool_result")) {
            if (prefixMap.text) {
                previousMessages.push(prefixMap.text);
            }
            if (prefixMap.function_call) {
                previousMessages.push(prefixMap.function_call);
            }
            if (prefixMap.tool_calls) {
                previousMessages.push(prefixMap.tool_calls);
            }
            prefixMap = nextPrefixMap;
            nextPrefixMap = void 0;
        }
        if (type === "text") {
            if (prefixMap["text"]) {
                prefixMap["text"] = {
                    ...prefixMap["text"],
                    content: (prefixMap["text"].content || "") + value
                };
            } else {
                prefixMap["text"] = {
                    id: generateId2(),
                    role: "assistant",
                    content: value,
                    createdAt
                };
            }
        }
        if (type === "tool_call_streaming_start") {
            if (prefixMap.text == null) {
                prefixMap.text = {
                    id: generateId2(),
                    role: "assistant",
                    content: "",
                    createdAt
                };
            }
            if (prefixMap.text.toolInvocations == null) {
                prefixMap.text.toolInvocations = [];
            }
            partialToolCalls[value.toolCallId] = {
                text: "",
                toolName: value.toolName,
                prefixMapIndex: prefixMap.text.toolInvocations.length
            };
            prefixMap.text.toolInvocations.push({
                state: "partial-call",
                toolCallId: value.toolCallId,
                toolName: value.toolName,
                args: void 0
            });
        } else if (type === "tool_call_delta") {
            const partialToolCall = partialToolCalls[value.toolCallId];
            partialToolCall.text += value.argsTextDelta;
            const { value: partialArgs } = parsePartialJson(partialToolCall.text);
            prefixMap.text.toolInvocations[partialToolCall.prefixMapIndex] = {
                state: "partial-call",
                toolCallId: value.toolCallId,
                toolName: partialToolCall.toolName,
                args: partialArgs
            };
            prefixMap.text.internalUpdateId = generateId2();
        } else if (type === "tool_call") {
            if (partialToolCalls[value.toolCallId] != null) {
                prefixMap.text.toolInvocations[partialToolCalls[value.toolCallId].prefixMapIndex] = {
                    state: "call",
                    ...value
                };
            } else {
                if (prefixMap.text == null) {
                    prefixMap.text = {
                        id: generateId2(),
                        role: "assistant",
                        content: "",
                        createdAt
                    };
                }
                if (prefixMap.text.toolInvocations == null) {
                    prefixMap.text.toolInvocations = [];
                }
                prefixMap.text.toolInvocations.push({
                    state: "call",
                    ...value
                });
            }
            prefixMap.text.internalUpdateId = generateId2();
            if (onToolCall) {
                const result = await onToolCall({
                    toolCall: value
                });
                if (result != null) {
                    prefixMap.text.toolInvocations[prefixMap.text.toolInvocations.length - 1] = {
                        state: "result",
                        ...value,
                        result
                    };
                }
            }
        } else if (type === "tool_result") {
            const toolInvocations = (_a = prefixMap.text) == null ? void 0 : _a.toolInvocations;
            if (toolInvocations == null) {
                throw new Error("tool_result must be preceded by a tool_call");
            }
            const toolInvocationIndex = toolInvocations.findIndex((invocation)=>invocation.toolCallId === value.toolCallId);
            if (toolInvocationIndex === -1) {
                throw new Error("tool_result must be preceded by a tool_call with the same toolCallId");
            }
            toolInvocations[toolInvocationIndex] = {
                ...toolInvocations[toolInvocationIndex],
                state: "result",
                ...value
            };
        }
        let functionCallMessage = null;
        if (type === "function_call") {
            prefixMap["function_call"] = {
                id: generateId2(),
                role: "assistant",
                content: "",
                function_call: value.function_call,
                name: value.function_call.name,
                createdAt
            };
            functionCallMessage = prefixMap["function_call"];
        }
        let toolCallMessage = null;
        if (type === "tool_calls") {
            prefixMap["tool_calls"] = {
                id: generateId2(),
                role: "assistant",
                content: "",
                tool_calls: value.tool_calls,
                createdAt
            };
            toolCallMessage = prefixMap["tool_calls"];
        }
        if (type === "data") {
            data.push(...value);
        }
        let responseMessage = prefixMap["text"];
        if (type === "message_annotations") {
            if (!messageAnnotations) {
                messageAnnotations = [
                    ...value
                ];
            } else {
                messageAnnotations.push(...value);
            }
            functionCallMessage = assignAnnotationsToMessage(prefixMap["function_call"], messageAnnotations);
            toolCallMessage = assignAnnotationsToMessage(prefixMap["tool_calls"], messageAnnotations);
            responseMessage = assignAnnotationsToMessage(prefixMap["text"], messageAnnotations);
            if (prefixMap.text != null) {
                prefixMap.text.internalUpdateId = generateId2();
            }
        }
        if (messageAnnotations == null ? void 0 : messageAnnotations.length) {
            if (prefixMap.text) {
                prefixMap.text.annotations = [
                    ...messageAnnotations
                ];
            }
            if (prefixMap.function_call) {
                prefixMap.function_call.annotations = [
                    ...messageAnnotations
                ];
            }
            if (prefixMap.tool_calls) {
                prefixMap.tool_calls.annotations = [
                    ...messageAnnotations
                ];
            }
        }
        const merged = [
            functionCallMessage,
            toolCallMessage,
            responseMessage
        ].filter(Boolean).map((message)=>({
                ...assignAnnotationsToMessage(message, messageAnnotations)
            }));
        update([
            ...previousMessages,
            ...merged
        ], [
            ...data
        ]);
    }
    onFinish == null ? void 0 : onFinish({
        message: prefixMap.text,
        finishReason,
        usage
    });
    return {
        messages: [
            prefixMap.text,
            prefixMap.function_call,
            prefixMap.tool_calls
        ].filter(Boolean),
        data
    };
}
// src/call-chat-api.ts
var getOriginalFetch = ()=>fetch;
async function callChatApi({ api, body, streamProtocol = "data", credentials, headers, abortController, restoreMessagesOnFailure, onResponse, onUpdate, onFinish, onToolCall, generateId: generateId2, fetch: fetch2 = getOriginalFetch() }) {
    var _a, _b;
    const response = await fetch2(api, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        signal: (_a = abortController == null ? void 0 : abortController()) == null ? void 0 : _a.signal,
        credentials
    }).catch((err)=>{
        restoreMessagesOnFailure();
        throw err;
    });
    if (onResponse) {
        try {
            await onResponse(response);
        } catch (err) {
            throw err;
        }
    }
    if (!response.ok) {
        restoreMessagesOnFailure();
        throw new Error((_b = await response.text()) != null ? _b : "Failed to fetch the chat response.");
    }
    if (!response.body) {
        throw new Error("The response body is empty.");
    }
    const reader = response.body.getReader();
    switch(streamProtocol){
        case "text":
            {
                const decoder = createChunkDecoder();
                const resultMessage = {
                    id: generateId2(),
                    createdAt: /* @__PURE__ */ new Date(),
                    role: "assistant",
                    content: ""
                };
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    resultMessage.content += decoder(value);
                    onUpdate([
                        {
                            ...resultMessage
                        }
                    ], []);
                    if ((abortController == null ? void 0 : abortController()) === null) {
                        reader.cancel();
                        break;
                    }
                }
                onFinish == null ? void 0 : onFinish(resultMessage, {
                    usage: {
                        completionTokens: NaN,
                        promptTokens: NaN,
                        totalTokens: NaN
                    },
                    finishReason: "unknown"
                });
                return {
                    messages: [
                        resultMessage
                    ],
                    data: []
                };
            }
        case "data":
            {
                return await processDataProtocolResponse({
                    reader,
                    abortControllerRef: abortController != null ? {
                        current: abortController()
                    } : void 0,
                    update: onUpdate,
                    onToolCall,
                    onFinish ({ message, finishReason, usage }) {
                        if (onFinish && message != null) {
                            onFinish(message, {
                                usage,
                                finishReason
                            });
                        }
                    },
                    generateId: generateId2
                });
            }
        default:
            {
                const exhaustiveCheck = streamProtocol;
                throw new Error(`Unknown stream protocol: ${exhaustiveCheck}`);
            }
    }
}
// src/call-completion-api.ts
var getOriginalFetch2 = ()=>fetch;
async function callCompletionApi({ api, prompt, credentials, headers, body, streamProtocol = "data", setCompletion, setLoading, setError, setAbortController, onResponse, onFinish, onError, onData, fetch: fetch2 = getOriginalFetch2() }) {
    try {
        setLoading(true);
        setError(void 0);
        const abortController = new AbortController();
        setAbortController(abortController);
        setCompletion("");
        const res = await fetch2(api, {
            method: "POST",
            body: JSON.stringify({
                prompt,
                ...body
            }),
            credentials,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            signal: abortController.signal
        }).catch((err)=>{
            throw err;
        });
        if (onResponse) {
            try {
                await onResponse(res);
            } catch (err) {
                throw err;
            }
        }
        if (!res.ok) {
            throw new Error(await res.text() || "Failed to fetch the chat response.");
        }
        if (!res.body) {
            throw new Error("The response body is empty.");
        }
        let result = "";
        const reader = res.body.getReader();
        switch(streamProtocol){
            case "text":
                {
                    const decoder = createChunkDecoder();
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) {
                            break;
                        }
                        result += decoder(value);
                        setCompletion(result);
                        if (abortController === null) {
                            reader.cancel();
                            break;
                        }
                    }
                    break;
                }
            case "data":
                {
                    for await (const { type, value } of readDataStream(reader, {
                        isAborted: ()=>abortController === null
                    })){
                        switch(type){
                            case "text":
                                {
                                    result += value;
                                    setCompletion(result);
                                    break;
                                }
                            case "data":
                                {
                                    onData == null ? void 0 : onData(value);
                                    break;
                                }
                        }
                    }
                    break;
                }
            default:
                {
                    const exhaustiveCheck = streamProtocol;
                    throw new Error(`Unknown stream protocol: ${exhaustiveCheck}`);
                }
        }
        if (onFinish) {
            onFinish(prompt, result);
        }
        setAbortController(null);
        return result;
    } catch (err) {
        if (err.name === "AbortError") {
            setAbortController(null);
            return null;
        }
        if (err instanceof Error) {
            if (onError) {
                onError(err);
            }
        }
        setError(err);
    } finally{
        setLoading(false);
    }
}
// src/create-chunk-decoder.ts
function createChunkDecoder(complex) {
    const decoder = new TextDecoder();
    if (!complex) {
        return function(chunk) {
            if (!chunk) return "";
            return decoder.decode(chunk, {
                stream: true
            });
        };
    }
    return function(chunk) {
        const decoded = decoder.decode(chunk, {
            stream: true
        }).split("\n").filter((line)=>line !== "");
        return decoded.map(parseStreamPart).filter(Boolean);
    };
}
// src/data-url.ts
function getTextFromDataUrl(dataUrl) {
    const [header, base64Content] = dataUrl.split(",");
    const mimeType = header.split(";")[0].split(":")[1];
    if (mimeType == null || base64Content == null) {
        throw new Error("Invalid data URL format");
    }
    try {
        return window.atob(base64Content);
    } catch (error) {
        throw new Error(`Error decoding data URL`);
    }
}
// src/is-deep-equal-data.ts
function isDeepEqualData(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== "object" && typeof obj2 !== "object") return obj1 === obj2;
    if (obj1.constructor !== obj2.constructor) return false;
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }
    if (Array.isArray(obj1)) {
        if (obj1.length !== obj2.length) return false;
        for(let i = 0; i < obj1.length; i++){
            if (!isDeepEqualData(obj1[i], obj2[i])) return false;
        }
        return true;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1){
        if (!keys2.includes(key)) return false;
        if (!isDeepEqualData(obj1[key], obj2[key])) return false;
    }
    return true;
}
// src/process-chat-stream.ts
async function processChatStream({ getStreamedResponse, experimental_onFunctionCall, experimental_onToolCall, updateChatRequest, getCurrentMessages }) {
    while(true){
        const messagesAndDataOrJustMessage = await getStreamedResponse();
        if ("messages" in messagesAndDataOrJustMessage) {
            let hasFollowingResponse = false;
            for (const message of messagesAndDataOrJustMessage.messages){
                if ((message.function_call === void 0 || typeof message.function_call === "string") && (message.tool_calls === void 0 || typeof message.tool_calls === "string")) {
                    continue;
                }
                hasFollowingResponse = true;
                if (experimental_onFunctionCall) {
                    const functionCall = message.function_call;
                    if (typeof functionCall !== "object") {
                        console.warn("experimental_onFunctionCall should not be defined when using tools");
                        continue;
                    }
                    const functionCallResponse = await experimental_onFunctionCall(getCurrentMessages(), functionCall);
                    if (functionCallResponse === void 0) {
                        hasFollowingResponse = false;
                        break;
                    }
                    updateChatRequest(functionCallResponse);
                }
                if (experimental_onToolCall) {
                    const toolCalls = message.tool_calls;
                    if (!Array.isArray(toolCalls) || toolCalls.some((toolCall)=>typeof toolCall !== "object")) {
                        console.warn("experimental_onToolCall should not be defined when using tools");
                        continue;
                    }
                    const toolCallResponse = await experimental_onToolCall(getCurrentMessages(), toolCalls);
                    if (toolCallResponse === void 0) {
                        hasFollowingResponse = false;
                        break;
                    }
                    updateChatRequest(toolCallResponse);
                }
            }
            if (!hasFollowingResponse) {
                break;
            }
        } else {
            let fixFunctionCallArguments2 = function(response) {
                for (const message of response.messages){
                    if (message.tool_calls !== void 0) {
                        for (const toolCall of message.tool_calls){
                            if (typeof toolCall === "object") {
                                if (toolCall.function.arguments && typeof toolCall.function.arguments !== "string") {
                                    toolCall.function.arguments = JSON.stringify(toolCall.function.arguments);
                                }
                            }
                        }
                    }
                    if (message.function_call !== void 0) {
                        if (typeof message.function_call === "object") {
                            if (message.function_call.arguments && typeof message.function_call.arguments !== "string") {
                                message.function_call.arguments = JSON.stringify(message.function_call.arguments);
                            }
                        }
                    }
                }
            };
            var fixFunctionCallArguments = fixFunctionCallArguments2;
            const streamedResponseMessage = messagesAndDataOrJustMessage;
            if ((streamedResponseMessage.function_call === void 0 || typeof streamedResponseMessage.function_call === "string") && (streamedResponseMessage.tool_calls === void 0 || typeof streamedResponseMessage.tool_calls === "string")) {
                break;
            }
            if (experimental_onFunctionCall) {
                const functionCall = streamedResponseMessage.function_call;
                if (!(typeof functionCall === "object")) {
                    console.warn("experimental_onFunctionCall should not be defined when using tools");
                    continue;
                }
                const functionCallResponse = await experimental_onFunctionCall(getCurrentMessages(), functionCall);
                if (functionCallResponse === void 0) break;
                fixFunctionCallArguments2(functionCallResponse);
                updateChatRequest(functionCallResponse);
            }
            if (experimental_onToolCall) {
                const toolCalls = streamedResponseMessage.tool_calls;
                if (!(typeof toolCalls === "object")) {
                    console.warn("experimental_onToolCall should not be defined when using functions");
                    continue;
                }
                const toolCallResponse = await experimental_onToolCall(getCurrentMessages(), toolCalls);
                if (toolCallResponse === void 0) break;
                fixFunctionCallArguments2(toolCallResponse);
                updateChatRequest(toolCallResponse);
            }
        }
    }
}
;
;
var schemaSymbol = Symbol.for("vercel.ai.schema");
function jsonSchema(jsonSchema2, { validate } = {}) {
    return {
        [schemaSymbol]: true,
        _type: void 0,
        // should never be used directly
        [__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatorSymbol"]]: true,
        jsonSchema: jsonSchema2,
        validate
    };
}
function isSchema(value) {
    return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema(schema) {
    return isSchema(schema) ? schema : zodSchema(schema);
}
function zodSchema(zodSchema2) {
    return jsonSchema(// we assume that zodToJsonSchema will return a valid JSONSchema7:
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2d$to$2d$json$2d$schema$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(zodSchema2), {
        validate: (value)=>{
            const result = zodSchema2.safeParse(value);
            return result.success ? {
                success: true,
                value: result.data
            } : {
                success: false,
                error: result.error
            };
        }
    });
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/x-project/proto/app/node_modules/@ai-sdk/anthropic/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Anthropic",
    ()=>Anthropic,
    "anthropic",
    ()=>anthropic,
    "createAnthropic",
    ()=>createAnthropic
]);
// src/anthropic-facade.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/@ai-sdk/provider-utils/dist/index.mjs [app-route] (ecmascript)");
// src/anthropic-messages-language-model.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/@ai-sdk/provider/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
;
;
var anthropicErrorDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("error"),
    error: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        message: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })
});
var anthropicFailedResponseHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createJsonErrorResponseHandler"])({
    errorSchema: anthropicErrorDataSchema,
    errorToMessage: (data)=>data.error.message
});
;
;
function convertToAnthropicMessagesPrompt({ prompt, cacheControl: isCacheControlEnabled }) {
    var _a, _b, _c, _d;
    const betas = /* @__PURE__ */ new Set();
    const blocks = groupIntoBlocks(prompt);
    let system = void 0;
    const messages = [];
    function getCacheControl(providerMetadata) {
        var _a2;
        if (isCacheControlEnabled === false) {
            return void 0;
        }
        const anthropic2 = providerMetadata == null ? void 0 : providerMetadata.anthropic;
        const cacheControlValue = (_a2 = anthropic2 == null ? void 0 : anthropic2.cacheControl) != null ? _a2 : anthropic2 == null ? void 0 : anthropic2.cache_control;
        return cacheControlValue;
    }
    for(let i = 0; i < blocks.length; i++){
        const block = blocks[i];
        const isLastBlock = i === blocks.length - 1;
        const type = block.type;
        switch(type){
            case "system":
                {
                    if (system != null) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                            functionality: "Multiple system messages that are separated by user/assistant messages"
                        });
                    }
                    system = block.messages.map(({ content, providerMetadata })=>({
                            type: "text",
                            text: content,
                            cache_control: getCacheControl(providerMetadata)
                        }));
                    break;
                }
            case "user":
                {
                    const anthropicContent = [];
                    for (const message of block.messages){
                        const { role, content } = message;
                        switch(role){
                            case "user":
                                {
                                    for(let j = 0; j < content.length; j++){
                                        const part = content[j];
                                        const isLastPart = j === content.length - 1;
                                        const cacheControl = (_a = getCacheControl(part.providerMetadata)) != null ? _a : isLastPart ? getCacheControl(message.providerMetadata) : void 0;
                                        switch(part.type){
                                            case "text":
                                                {
                                                    anthropicContent.push({
                                                        type: "text",
                                                        text: part.text,
                                                        cache_control: cacheControl
                                                    });
                                                    break;
                                                }
                                            case "image":
                                                {
                                                    if (part.image instanceof URL) {
                                                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                                                            functionality: "Image URLs in user messages"
                                                        });
                                                    }
                                                    anthropicContent.push({
                                                        type: "image",
                                                        source: {
                                                            type: "base64",
                                                            media_type: (_b = part.mimeType) != null ? _b : "image/jpeg",
                                                            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertUint8ArrayToBase64"])(part.image)
                                                        },
                                                        cache_control: cacheControl
                                                    });
                                                    break;
                                                }
                                            case "file":
                                                {
                                                    if (part.data instanceof URL) {
                                                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                                                            functionality: "Image URLs in user messages"
                                                        });
                                                    }
                                                    if (part.mimeType !== "application/pdf") {
                                                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                                                            functionality: "Non-PDF files in user messages"
                                                        });
                                                    }
                                                    betas.add("pdfs-2024-09-25");
                                                    anthropicContent.push({
                                                        type: "document",
                                                        source: {
                                                            type: "base64",
                                                            media_type: "application/pdf",
                                                            data: part.data
                                                        },
                                                        cache_control: cacheControl
                                                    });
                                                    break;
                                                }
                                        }
                                    }
                                    break;
                                }
                            case "tool":
                                {
                                    for(let i2 = 0; i2 < content.length; i2++){
                                        const part = content[i2];
                                        const isLastPart = i2 === content.length - 1;
                                        const cacheControl = (_c = getCacheControl(part.providerMetadata)) != null ? _c : isLastPart ? getCacheControl(message.providerMetadata) : void 0;
                                        const toolResultContent = part.content != null ? part.content.map((part2)=>{
                                            var _a2;
                                            switch(part2.type){
                                                case "text":
                                                    return {
                                                        type: "text",
                                                        text: part2.text,
                                                        cache_control: void 0
                                                    };
                                                case "image":
                                                    return {
                                                        type: "image",
                                                        source: {
                                                            type: "base64",
                                                            media_type: (_a2 = part2.mimeType) != null ? _a2 : "image/jpeg",
                                                            data: part2.data
                                                        },
                                                        cache_control: void 0
                                                    };
                                            }
                                        }) : JSON.stringify(part.result);
                                        anthropicContent.push({
                                            type: "tool_result",
                                            tool_use_id: part.toolCallId,
                                            content: toolResultContent,
                                            is_error: part.isError,
                                            cache_control: cacheControl
                                        });
                                    }
                                    break;
                                }
                            default:
                                {
                                    const _exhaustiveCheck = role;
                                    throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
                                }
                        }
                    }
                    messages.push({
                        role: "user",
                        content: anthropicContent
                    });
                    break;
                }
            case "assistant":
                {
                    const anthropicContent = [];
                    for(let j = 0; j < block.messages.length; j++){
                        const message = block.messages[j];
                        const isLastMessage = j === block.messages.length - 1;
                        const { content } = message;
                        for(let k = 0; k < content.length; k++){
                            const part = content[k];
                            const isLastContentPart = k === content.length - 1;
                            const cacheControl = (_d = getCacheControl(part.providerMetadata)) != null ? _d : isLastContentPart ? getCacheControl(message.providerMetadata) : void 0;
                            switch(part.type){
                                case "text":
                                    {
                                        anthropicContent.push({
                                            type: "text",
                                            text: // trim the last text part if it's the last message in the block
                                            // because Anthropic does not allow trailing whitespace
                                            // in pre-filled assistant responses
                                            isLastBlock && isLastMessage && isLastContentPart ? part.text.trim() : part.text,
                                            cache_control: cacheControl
                                        });
                                        break;
                                    }
                                case "tool-call":
                                    {
                                        anthropicContent.push({
                                            type: "tool_use",
                                            id: part.toolCallId,
                                            name: part.toolName,
                                            input: part.args,
                                            cache_control: cacheControl
                                        });
                                        break;
                                    }
                            }
                        }
                    }
                    messages.push({
                        role: "assistant",
                        content: anthropicContent
                    });
                    break;
                }
            default:
                {
                    const _exhaustiveCheck = type;
                    throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
                }
        }
    }
    return {
        prompt: {
            system,
            messages
        },
        betas
    };
}
function groupIntoBlocks(prompt) {
    const blocks = [];
    let currentBlock = void 0;
    for (const message of prompt){
        const { role } = message;
        switch(role){
            case "system":
                {
                    if ((currentBlock == null ? void 0 : currentBlock.type) !== "system") {
                        currentBlock = {
                            type: "system",
                            messages: []
                        };
                        blocks.push(currentBlock);
                    }
                    currentBlock.messages.push(message);
                    break;
                }
            case "assistant":
                {
                    if ((currentBlock == null ? void 0 : currentBlock.type) !== "assistant") {
                        currentBlock = {
                            type: "assistant",
                            messages: []
                        };
                        blocks.push(currentBlock);
                    }
                    currentBlock.messages.push(message);
                    break;
                }
            case "user":
                {
                    if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
                        currentBlock = {
                            type: "user",
                            messages: []
                        };
                        blocks.push(currentBlock);
                    }
                    currentBlock.messages.push(message);
                    break;
                }
            case "tool":
                {
                    if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
                        currentBlock = {
                            type: "user",
                            messages: []
                        };
                        blocks.push(currentBlock);
                    }
                    currentBlock.messages.push(message);
                    break;
                }
            default:
                {
                    const _exhaustiveCheck = role;
                    throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
                }
        }
    }
    return blocks;
}
// src/map-anthropic-stop-reason.ts
function mapAnthropicStopReason(finishReason) {
    switch(finishReason){
        case "end_turn":
        case "stop_sequence":
            return "stop";
        case "tool_use":
            return "tool-calls";
        case "max_tokens":
            return "length";
        default:
            return "unknown";
    }
}
;
function prepareTools(mode) {
    var _a;
    const tools = ((_a = mode.tools) == null ? void 0 : _a.length) ? mode.tools : void 0;
    const toolWarnings = [];
    const betas = /* @__PURE__ */ new Set();
    if (tools == null) {
        return {
            tools: void 0,
            tool_choice: void 0,
            toolWarnings,
            betas
        };
    }
    const anthropicTools2 = [];
    for (const tool of tools){
        switch(tool.type){
            case "function":
                anthropicTools2.push({
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.parameters
                });
                break;
            case "provider-defined":
                betas.add("computer-use-2024-10-22");
                switch(tool.id){
                    case "anthropic.computer_20241022":
                        anthropicTools2.push({
                            name: tool.name,
                            type: "computer_20241022",
                            display_width_px: tool.args.displayWidthPx,
                            display_height_px: tool.args.displayHeightPx,
                            display_number: tool.args.displayNumber
                        });
                        break;
                    case "anthropic.text_editor_20241022":
                        anthropicTools2.push({
                            name: tool.name,
                            type: "text_editor_20241022"
                        });
                        break;
                    case "anthropic.bash_20241022":
                        anthropicTools2.push({
                            name: tool.name,
                            type: "bash_20241022"
                        });
                        break;
                    default:
                        toolWarnings.push({
                            type: "unsupported-tool",
                            tool
                        });
                        break;
                }
                break;
            default:
                toolWarnings.push({
                    type: "unsupported-tool",
                    tool
                });
                break;
        }
    }
    const toolChoice = mode.toolChoice;
    if (toolChoice == null) {
        return {
            tools: anthropicTools2,
            tool_choice: void 0,
            toolWarnings,
            betas
        };
    }
    const type = toolChoice.type;
    switch(type){
        case "auto":
            return {
                tools: anthropicTools2,
                tool_choice: {
                    type: "auto"
                },
                toolWarnings,
                betas
            };
        case "required":
            return {
                tools: anthropicTools2,
                tool_choice: {
                    type: "any"
                },
                toolWarnings,
                betas
            };
        case "none":
            return {
                tools: void 0,
                tool_choice: void 0,
                toolWarnings,
                betas
            };
        case "tool":
            return {
                tools: anthropicTools2,
                tool_choice: {
                    type: "tool",
                    name: toolChoice.toolName
                },
                toolWarnings,
                betas
            };
        default:
            {
                const _exhaustiveCheck = type;
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                    functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
                });
            }
    }
}
// src/anthropic-messages-language-model.ts
var AnthropicMessagesLanguageModel = class {
    constructor(modelId, settings, config){
        this.specificationVersion = "v1";
        this.defaultObjectGenerationMode = "tool";
        this.supportsImageUrls = false;
        this.modelId = modelId;
        this.settings = settings;
        this.config = config;
    }
    get provider() {
        return this.config.provider;
    }
    async getArgs({ mode, prompt, maxTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed }) {
        var _a;
        const type = mode.type;
        const warnings = [];
        if (frequencyPenalty != null) {
            warnings.push({
                type: "unsupported-setting",
                setting: "frequencyPenalty"
            });
        }
        if (presencePenalty != null) {
            warnings.push({
                type: "unsupported-setting",
                setting: "presencePenalty"
            });
        }
        if (seed != null) {
            warnings.push({
                type: "unsupported-setting",
                setting: "seed"
            });
        }
        if (responseFormat != null && responseFormat.type !== "text") {
            warnings.push({
                type: "unsupported-setting",
                setting: "responseFormat",
                details: "JSON response format is not supported."
            });
        }
        const { prompt: messagesPrompt, betas: messagesBetas } = convertToAnthropicMessagesPrompt({
            prompt,
            cacheControl: (_a = this.settings.cacheControl) != null ? _a : false
        });
        const baseArgs = {
            // model id:
            model: this.modelId,
            // model specific settings:
            top_k: topK != null ? topK : this.settings.topK,
            // standardized settings:
            max_tokens: maxTokens != null ? maxTokens : 4096,
            // 4096: max model output tokens
            temperature,
            top_p: topP,
            stop_sequences: stopSequences,
            // prompt:
            system: messagesPrompt.system,
            messages: messagesPrompt.messages
        };
        switch(type){
            case "regular":
                {
                    const { tools, tool_choice, toolWarnings, betas: toolsBetas } = prepareTools(mode);
                    return {
                        args: {
                            ...baseArgs,
                            tools,
                            tool_choice
                        },
                        warnings: [
                            ...warnings,
                            ...toolWarnings
                        ],
                        betas: /* @__PURE__ */ new Set([
                            ...messagesBetas,
                            ...toolsBetas
                        ])
                    };
                }
            case "object-json":
                {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedFunctionalityError"]({
                        functionality: "json-mode object generation"
                    });
                }
            case "object-tool":
                {
                    const { name, description, parameters } = mode.tool;
                    return {
                        args: {
                            ...baseArgs,
                            tools: [
                                {
                                    name,
                                    description,
                                    input_schema: parameters
                                }
                            ],
                            tool_choice: {
                                type: "tool",
                                name
                            }
                        },
                        warnings,
                        betas: messagesBetas
                    };
                }
            default:
                {
                    const _exhaustiveCheck = type;
                    throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
                }
        }
    }
    getHeaders({ betas, headers }) {
        if (this.settings.cacheControl) {
            betas.add("prompt-caching-2024-07-31");
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["combineHeaders"])(this.config.headers(), betas.size > 0 ? {
            "anthropic-beta": Array.from(betas).join(",")
        } : {}, headers);
    }
    async doGenerate(options) {
        var _a, _b, _c, _d;
        const { args, warnings, betas } = await this.getArgs(options);
        const { responseHeaders, value: response } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postJsonToApi"])({
            url: `${this.config.baseURL}/messages`,
            headers: this.getHeaders({
                betas,
                headers: options.headers
            }),
            body: args,
            failedResponseHandler: anthropicFailedResponseHandler,
            successfulResponseHandler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createJsonResponseHandler"])(anthropicMessagesResponseSchema),
            abortSignal: options.abortSignal,
            fetch: this.config.fetch
        });
        const { messages: rawPrompt, ...rawSettings } = args;
        let text = "";
        for (const content of response.content){
            if (content.type === "text") {
                text += content.text;
            }
        }
        let toolCalls = void 0;
        if (response.content.some((content)=>content.type === "tool_use")) {
            toolCalls = [];
            for (const content of response.content){
                if (content.type === "tool_use") {
                    toolCalls.push({
                        toolCallType: "function",
                        toolCallId: content.id,
                        toolName: content.name,
                        args: JSON.stringify(content.input)
                    });
                }
            }
        }
        return {
            text,
            toolCalls,
            finishReason: mapAnthropicStopReason(response.stop_reason),
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens
            },
            rawCall: {
                rawPrompt,
                rawSettings
            },
            rawResponse: {
                headers: responseHeaders
            },
            response: {
                id: (_a = response.id) != null ? _a : void 0,
                modelId: (_b = response.model) != null ? _b : void 0
            },
            warnings,
            providerMetadata: this.settings.cacheControl === true ? {
                anthropic: {
                    cacheCreationInputTokens: (_c = response.usage.cache_creation_input_tokens) != null ? _c : null,
                    cacheReadInputTokens: (_d = response.usage.cache_read_input_tokens) != null ? _d : null
                }
            } : void 0,
            request: {
                body: JSON.stringify(args)
            }
        };
    }
    async doStream(options) {
        const { args, warnings, betas } = await this.getArgs(options);
        const body = {
            ...args,
            stream: true
        };
        const { responseHeaders, value: response } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postJsonToApi"])({
            url: `${this.config.baseURL}/messages`,
            headers: this.getHeaders({
                betas,
                headers: options.headers
            }),
            body,
            failedResponseHandler: anthropicFailedResponseHandler,
            successfulResponseHandler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEventSourceResponseHandler"])(anthropicMessagesChunkSchema),
            abortSignal: options.abortSignal,
            fetch: this.config.fetch
        });
        const { messages: rawPrompt, ...rawSettings } = args;
        let finishReason = "unknown";
        const usage = {
            promptTokens: Number.NaN,
            completionTokens: Number.NaN
        };
        const toolCallContentBlocks = {};
        let providerMetadata = void 0;
        const self = this;
        return {
            stream: response.pipeThrough(new TransformStream({
                transform (chunk, controller) {
                    var _a, _b, _c, _d;
                    if (!chunk.success) {
                        controller.enqueue({
                            type: "error",
                            error: chunk.error
                        });
                        return;
                    }
                    const value = chunk.value;
                    switch(value.type){
                        case "ping":
                            {
                                return;
                            }
                        case "content_block_start":
                            {
                                const contentBlockType = value.content_block.type;
                                switch(contentBlockType){
                                    case "text":
                                        {
                                            return;
                                        }
                                    case "tool_use":
                                        {
                                            toolCallContentBlocks[value.index] = {
                                                toolCallId: value.content_block.id,
                                                toolName: value.content_block.name,
                                                jsonText: ""
                                            };
                                            return;
                                        }
                                    default:
                                        {
                                            const _exhaustiveCheck = contentBlockType;
                                            throw new Error(`Unsupported content block type: ${_exhaustiveCheck}`);
                                        }
                                }
                            }
                        case "content_block_stop":
                            {
                                if (toolCallContentBlocks[value.index] != null) {
                                    const contentBlock = toolCallContentBlocks[value.index];
                                    controller.enqueue({
                                        type: "tool-call",
                                        toolCallType: "function",
                                        toolCallId: contentBlock.toolCallId,
                                        toolName: contentBlock.toolName,
                                        args: contentBlock.jsonText
                                    });
                                    delete toolCallContentBlocks[value.index];
                                }
                                return;
                            }
                        case "content_block_delta":
                            {
                                const deltaType = value.delta.type;
                                switch(deltaType){
                                    case "text_delta":
                                        {
                                            controller.enqueue({
                                                type: "text-delta",
                                                textDelta: value.delta.text
                                            });
                                            return;
                                        }
                                    case "input_json_delta":
                                        {
                                            const contentBlock = toolCallContentBlocks[value.index];
                                            controller.enqueue({
                                                type: "tool-call-delta",
                                                toolCallType: "function",
                                                toolCallId: contentBlock.toolCallId,
                                                toolName: contentBlock.toolName,
                                                argsTextDelta: value.delta.partial_json
                                            });
                                            contentBlock.jsonText += value.delta.partial_json;
                                            return;
                                        }
                                    default:
                                        {
                                            const _exhaustiveCheck = deltaType;
                                            throw new Error(`Unsupported delta type: ${_exhaustiveCheck}`);
                                        }
                                }
                            }
                        case "message_start":
                            {
                                usage.promptTokens = value.message.usage.input_tokens;
                                usage.completionTokens = value.message.usage.output_tokens;
                                if (self.settings.cacheControl === true) {
                                    providerMetadata = {
                                        anthropic: {
                                            cacheCreationInputTokens: (_a = value.message.usage.cache_creation_input_tokens) != null ? _a : null,
                                            cacheReadInputTokens: (_b = value.message.usage.cache_read_input_tokens) != null ? _b : null
                                        }
                                    };
                                }
                                controller.enqueue({
                                    type: "response-metadata",
                                    id: (_c = value.message.id) != null ? _c : void 0,
                                    modelId: (_d = value.message.model) != null ? _d : void 0
                                });
                                return;
                            }
                        case "message_delta":
                            {
                                usage.completionTokens = value.usage.output_tokens;
                                finishReason = mapAnthropicStopReason(value.delta.stop_reason);
                                return;
                            }
                        case "message_stop":
                            {
                                controller.enqueue({
                                    type: "finish",
                                    finishReason,
                                    usage,
                                    providerMetadata
                                });
                                return;
                            }
                        case "error":
                            {
                                controller.enqueue({
                                    type: "error",
                                    error: value.error
                                });
                                return;
                            }
                        default:
                            {
                                const _exhaustiveCheck = value;
                                throw new Error(`Unsupported chunk type: ${_exhaustiveCheck}`);
                            }
                    }
                }
            })),
            rawCall: {
                rawPrompt,
                rawSettings
            },
            rawResponse: {
                headers: responseHeaders
            },
            warnings,
            request: {
                body: JSON.stringify(body)
            }
        };
    }
};
var anthropicMessagesResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("message"),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish(),
    model: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
        __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("text"),
            text: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("tool_use"),
            id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            input: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()
        })
    ])),
    stop_reason: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish(),
    usage: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        output_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        cache_creation_input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullish(),
        cache_read_input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullish()
    })
});
var anthropicMessagesChunkSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("message_start"),
        message: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish(),
            model: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish(),
            usage: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                output_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                cache_creation_input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullish(),
                cache_read_input_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullish()
            })
        })
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("content_block_start"),
        index: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        content_block: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
            __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("text"),
                text: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("tool_use"),
                id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
                name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
            })
        ])
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("content_block_delta"),
        index: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        delta: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
            __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("input_json_delta"),
                partial_json: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("text_delta"),
                text: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
            })
        ])
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("content_block_stop"),
        index: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("error"),
        error: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            message: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("message_delta"),
        delta: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            stop_reason: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullish()
        }),
        usage: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            output_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        })
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("message_stop")
    }),
    __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("ping")
    })
]);
// src/anthropic-facade.ts
var Anthropic = class {
    /**
   * Creates a new Anthropic provider instance.
   */ constructor(options = {}){
        var _a, _b;
        this.baseURL = (_b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withoutTrailingSlash"])((_a = options.baseURL) != null ? _a : options.baseUrl)) != null ? _b : "https://api.anthropic.com/v1";
        this.apiKey = options.apiKey;
        this.headers = options.headers;
    }
    get baseConfig() {
        return {
            baseURL: this.baseURL,
            headers: ()=>({
                    "anthropic-version": "2023-06-01",
                    "x-api-key": (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadApiKey"])({
                        apiKey: this.apiKey,
                        environmentVariableName: "ANTHROPIC_API_KEY",
                        description: "Anthropic"
                    }),
                    ...this.headers
                })
        };
    }
    /**
   * @deprecated Use `chat()` instead.
   */ messages(modelId, settings = {}) {
        return this.chat(modelId, settings);
    }
    chat(modelId, settings = {}) {
        return new AnthropicMessagesLanguageModel(modelId, settings, {
            provider: "anthropic.messages",
            ...this.baseConfig
        });
    }
};
;
;
;
var Bash20241022Parameters = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    command: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    restart: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
function bashTool_20241022(options = {}) {
    return {
        type: "provider-defined",
        id: "anthropic.bash_20241022",
        args: {},
        parameters: Bash20241022Parameters,
        execute: options.execute,
        experimental_toToolResultContent: options.experimental_toToolResultContent
    };
}
var TextEditor20241022Parameters = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    command: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "view",
        "create",
        "str_replace",
        "insert",
        "undo_edit"
    ]),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    file_text: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    insert_line: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().optional(),
    new_str: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    old_str: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    view_range: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int()).optional()
});
function textEditorTool_20241022(options = {}) {
    return {
        type: "provider-defined",
        id: "anthropic.text_editor_20241022",
        args: {},
        parameters: TextEditor20241022Parameters,
        execute: options.execute,
        experimental_toToolResultContent: options.experimental_toToolResultContent
    };
}
var Computer20241022Parameters = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    action: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "key",
        "type",
        "mouse_move",
        "left_click",
        "left_click_drag",
        "right_click",
        "middle_click",
        "double_click",
        "screenshot",
        "cursor_position"
    ]),
    coordinate: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int()).optional(),
    text: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
function computerTool_20241022(options) {
    return {
        type: "provider-defined",
        id: "anthropic.computer_20241022",
        args: {
            displayWidthPx: options.displayWidthPx,
            displayHeightPx: options.displayHeightPx,
            displayNumber: options.displayNumber
        },
        parameters: Computer20241022Parameters,
        execute: options.execute,
        experimental_toToolResultContent: options.experimental_toToolResultContent
    };
}
var anthropicTools = {
    bash_20241022: bashTool_20241022,
    textEditor_20241022: textEditorTool_20241022,
    computer_20241022: computerTool_20241022
};
// src/anthropic-provider.ts
function createAnthropic(options = {}) {
    var _a, _b;
    const baseURL = (_b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withoutTrailingSlash"])((_a = options.baseURL) != null ? _a : options.baseUrl)) != null ? _b : "https://api.anthropic.com/v1";
    const getHeaders = ()=>({
            "anthropic-version": "2023-06-01",
            "x-api-key": (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadApiKey"])({
                apiKey: options.apiKey,
                environmentVariableName: "ANTHROPIC_API_KEY",
                description: "Anthropic"
            }),
            ...options.headers
        });
    const createChatModel = (modelId, settings = {})=>new AnthropicMessagesLanguageModel(modelId, settings, {
            provider: "anthropic.messages",
            baseURL,
            headers: getHeaders,
            fetch: options.fetch
        });
    const provider = function(modelId, settings) {
        if (new.target) {
            throw new Error("The Anthropic model function cannot be called with the new keyword.");
        }
        return createChatModel(modelId, settings);
    };
    provider.languageModel = createChatModel;
    provider.chat = createChatModel;
    provider.messages = createChatModel;
    provider.textEmbeddingModel = (modelId)=>{
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoSuchModelError"]({
            modelId,
            modelType: "textEmbeddingModel"
        });
    };
    provider.tools = anthropicTools;
    return provider;
}
var anthropic = createAnthropic();
;
 //# sourceMappingURL=index.mjs.map
}),
];

//# sourceMappingURL=fcbc1_8af7db65._.js.map