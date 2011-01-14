var assert = require("assert");
var scopeleaks = require("../scopeleaks");

assert.deepEqual(scopeleaks.leaks(), []);

x = 1, y = 2;

assert.deepEqual(scopeleaks.leaks(), ["x", "y"]);

try { require('sys').print("ok\n") }
catch (e) { print("ok"); }
