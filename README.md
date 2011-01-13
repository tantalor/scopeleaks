# scopeleaks.js

This small library allows for detecting if miscellaneous variables are being leaked into the global Javascript scope. It is useful to sanitize your scripts, both in __browser__ and __CommonJS__ environments.

# Setup

The setup of `scopeleaks.js` is minimal. You just need to insert it into the appropriate execution environment, and all detection routines will be bound.

__To leverage all the benefits of leakage detection, the library should be inserted into your Javascript execution environment right at the beginning.__

## Browser

Insert the `scopeleaks.js` script into your Web page, e.g.:

	<script src="scopeleaks.js" type="text/javascript" charset="utf-8"></script>

## Common.js

Insert the `scopeleaks.js` script just like any other module, e.g.:

	require("./scopeleaks");


# Usage

This library provides two functions, `_snapshot`, and `_leaks`, with the following signatures:

	_snapshot()

This function returns a snapshot of the current status of the global scope, i.e., the _names_ of all variables, functions, etc. attached to it.

	_leaks(snapshot)

This function returns the new additions to the global scope, based on a given initial `snapshot` passed as parameter. If no snapshot is provided, it will automatically execute the `_snapshot` function, to capture the current global scope.

## Additional examples

More example usage can be found at the `test` directory, for both __browser__ and __CommonJS__ environments.

# Notes

Internally, the two functions (`_snapshot` and `_leaks`) are attached to the global scope (yes, they _leak_), albeit not being shown in the returning value from the `_leaks` function.