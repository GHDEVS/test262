// Copyright 2022 Kevin Gibbons. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Matching behavior with duplicate named capture groups
esid: prod-GroupSpecifier
features: [regexp-duplicate-named-groups]
includes: [compareArray.js]
---*/

assert.compareArray("bab".match(/(?<x>a)|(?<x>b)/), ["b", "b"]);
assert.compareArray("bab".match(/(?<x>b)|(?<x>a)/), ["b", "b"]);

assert.compareArray("aa".match(/(?:(?<x>a)|(?<x>b))\k<x>/), ["aa", "aa", undefined]);
assert.compareArray("bb".match(/(?:(?<x>a)|(?<x>b))\k<x>/), ["bb", undefined, "bb"]);

let matchResult = "aabb".match(/(?:(?:(?<x>a)|(?<x>b))\k<x>){2}/);
assert.compareArray(matchResult, ["aabb", undefined, "bb"]);
assert.sameValue(matchResult.groups.x, "bb");

let notMatched = "abab".match(/(?:(?:(?<x>a)|(?<x>b))\k<x>){2}/);
assert.sameValue(notMatched, null);
