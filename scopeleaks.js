(function() {
	
	var scope = typeof global !== "undefined" ? global : window;
	var original = undefined;
	
	function snapshot() {
		var snapshot = [];

		for (var i in scope)
			snapshot.push(i);

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
				original.indexOf(ss[i]) == -1)
				leaks.push(ss[i]);
		
		return leaks;
	};
	
  if (typeof(window) !== 'undefined') {
    window.scopeleaks = {leaks: leaks};
  } else if (typeof(exports) !== 'undefined') {
    exports.leaks = leaks;
  }
  
	snapshot();
	
})();
