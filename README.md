# scopeleaks.js

This small module allows for detecting if miscellaneous variables are being leaked into the global Javascript scope. It is useful to sanitize your scripts, both in __browser__ and __CommonJS__ environments.

# Setup

The setup of `scopeleaks.js` is minimal. You just need to insert it into the appropriate execution environment, and all detection routines will be bound.

__To leverage all the benefits of leakage detection, the module should be inserted into your Javascript execution environment right at the beginning.__

## Browser

Insert the `scopeleaks.js` script into your Web page, e.g.:

	<script src="scopeleaks.js" type="text/javascript" charset="utf-8"></script>

## CommonJS

Insert the `scopeleaks.js` script just like any other module, e.g.:

	var scopeleaks = require("../scopeleaks");

## JavaScriptCore

Insert the `scopeleaks.js` script just like any other module, e.g.:

	var scopeleaks = load("scopeleaks.js");

# Usage

This module provides two functions, `snapshot`, and `leaks`, with the following signatures:

	var snapshot = scopeleaks.snapshot();

This function returns a snapshot of the current status of the global scope, i.e., the _names_ of all variables, functions, etc. attached to it.

	var leaks = scopeleaks.leaks(snapshot);

This function returns the new additions to the global scope, based on a given initial `snapshot` passed as parameter. If no snapshot is provided, it will automatically execute the `snapshot` function, to capture the current global scope.

## Additional examples

More example usage can be found at the `test` directory, for the __browser__, __CommonJS__, and __JavaScriptCore__ environments.
