"use strict";
/*
 * This file contains functions to work with pure data only (no browser features, DOM, side effects, etc).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxInIterator = exports.areSetsEqual = exports.parseSimpleCssSelector = exports.round = exports.countTruthy = exports.replaceNaN = exports.toFloat = exports.toInt = exports.excludes = exports.includes = void 0;
/**
 * Does the same as Array.prototype.includes but has better typing
 */
function includes(haystack, needle) {
    for (let i = 0, l = haystack.length; i < l; ++i) {
        if (haystack[i] === needle) {
            return true;
        }
    }
    return false;
}
exports.includes = includes;
/**
 * Like `!includes()` but with proper typing
 */
function excludes(haystack, needle) {
    return !includes(haystack, needle);
}
exports.excludes = excludes;
/**
 * Be careful, NaN can return
 */
function toInt(value) {
    return parseInt(value);
}
exports.toInt = toInt;
/**
 * Be careful, NaN can return
 */
function toFloat(value) {
    return parseFloat(value);
}
exports.toFloat = toFloat;
function replaceNaN(value, replacement) {
    return typeof value === 'number' && isNaN(value) ? replacement : value;
}
exports.replaceNaN = replaceNaN;
function countTruthy(values) {
    return values.reduce((sum, value) => sum + (value ? 1 : 0), 0);
}
exports.countTruthy = countTruthy;
function round(value, base = 1) {
    if (Math.abs(base) >= 1) {
        return Math.round(value / base) * base;
    }
    else {
        // Sometimes when a number is multiplied by a small number, precision is lost,
        // for example 1234 * 0.0001 === 0.12340000000000001, and it's more precise divide: 1234 / (1 / 0.0001) === 0.1234.
        const counterBase = 1 / base;
        return Math.round(value * counterBase) / counterBase;
    }
}
exports.round = round;
/**
 * Parses a CSS selector into tag name with HTML attributes.
 * Only single element selector are supported (without operators like space, +, >, etc).
 *
 * Multiple values can be returned for each attribute. You decide how to handle them.
 */
function parseSimpleCssSelector(selector) {
    var _a, _b;
    const errorMessage = `Unexpected syntax '${selector}'`;
    const tagMatch = /^\s*([a-z-]*)(.*)$/i.exec(selector);
    const tag = tagMatch[1] || undefined;
    const attributes = {};
    const partsRegex = /([.:#][\w-]+|\[.+?\])/gi;
    const addAttribute = (name, value) => {
        attributes[name] = attributes[name] || [];
        attributes[name].push(value);
    };
    for (;;) {
        const match = partsRegex.exec(tagMatch[2]);
        if (!match) {
            break;
        }
        const part = match[0];
        switch (part[0]) {
            case '.':
                addAttribute('class', part.slice(1));
                break;
            case '#':
                addAttribute('id', part.slice(1));
                break;
            case '[': {
                const attributeMatch = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(part);
                if (attributeMatch) {
                    addAttribute(attributeMatch[1], (_b = (_a = attributeMatch[4]) !== null && _a !== void 0 ? _a : attributeMatch[5]) !== null && _b !== void 0 ? _b : '');
                }
                else {
                    throw new Error(errorMessage);
                }
                break;
            }
            default:
                throw new Error(errorMessage);
        }
    }
    return [tag, attributes];
}
exports.parseSimpleCssSelector = parseSimpleCssSelector;
function areSetsEqual(set1, set2) {
    if (set1 === set2) {
        return true;
    }
    if (set1.size !== set2.size) {
        return false;
    }
    if (set1.values) {
        for (let iter = set1.values(), step = iter.next(); !step.done; step = iter.next()) {
            if (!set2.has(step.value)) {
                return false;
            }
        }
        return true;
    }
    else {
        // An implementation for browsers that don't support Set iterators
        let areEqual = true;
        set1.forEach((value) => {
            if (areEqual && !set2.has(value)) {
                areEqual = false;
            }
        });
        return areEqual;
    }
}
exports.areSetsEqual = areSetsEqual;
function maxInIterator(iterator, getItemScore) {
    let maxItem;
    let maxItemScore;
    for (let step = iterator.next(); !step.done; step = iterator.next()) {
        const item = step.value;
        const score = getItemScore(item);
        if (maxItemScore === undefined || score > maxItemScore) {
            maxItem = item;
            maxItemScore = score;
        }
    }
    return maxItem;
}
exports.maxInIterator = maxInIterator;
