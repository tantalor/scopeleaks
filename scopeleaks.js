(function() {
	
  var scope = 
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
    this;

	var original = undefined;
	
	function snapshot() {
		var snapshot = new Object();

		for (var i in scope)
			snapshot[i] = 1;

		original = original || snapshot;

		return snapshot;
	};
	
	function leaks() {
		var ss = snapshot();
		var leaks = [];

		for (var i in ss)
			if (
				!(scope.document && scope.document.getElementById(ss[i]) != null) &&
				!(typeof(scope.opera) == 'object' && scope.opera.toString() == "[object Opera]" && ss[i] == "onhashchange") &&
				!original[(i)])
				leaks.push(i);
		
		return leaks;
	};
	
	snapshot();
	
  if (typeof(window) !== 'undefined') {
    window.scopeleaks = {leaks: leaks};
    original.scopeleaks = 1;
  } else if (typeof(exports) !== 'undefined') {
    exports.leaks = leaks;
  } else {
    return {leaks: leaks};
  }
})();
