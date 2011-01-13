var assert = require("assert");
require("../scopeleaks");

assert.deepEqual(_leaks(), []);

x = 1, y = 2;

assert.deepEqual(_leaks(), ["x", "y"]);