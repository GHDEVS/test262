// Copyright 2022 Kevin Gibbons. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Matching behavior with duplicate named capture groups
esid: prod-GroupSpecifier
features: [regexp-duplicate-named-groups]
includes: [compareArray.js]
---*/

assert.compareArray(/(?<x>a)|(?<x>b)/.exec("bab"), ["b", "b"]);
assert.compareArray(/(?<x>b)|(?<x>a)/.exec("bab"), ["b", "b"]);

assert.compareArray(/(?:(?<x>a)|(?<x>b))\k<x>/.exec("aa"), ["aa", "aa", undefined]);
assert.compareArray(/(?:(?<x>a)|(?<x>b))\k<x>/.exec("bb"), ["bb", undefined, "bb"]);

let execResult = /(?:(?:(?<x>a)|(?<x>b))\k<x>){2}/.exec("aabb");
assert.compareArray(execResult, ["aabb", undefined, "bb"]);
assert.sameValue(execResult.groups.x, "bb");

let notMatched = /(?:(?:(?<x>a)|(?<x>b))\k<x>){2}/.exec("abab");
assert.sameValue(notMatched, null);
