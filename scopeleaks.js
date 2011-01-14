(function(scope) {
	
	var original = undefined;
	
	function snapshot() {
		var snapshot = [];

		for (var i in scope)
			snapshot.push(i);

		original = original || snapshot;

		return snapshot;
	};
	
	var methods = {
		leaks: function() {
			var ss = snapshot();
			var leaks = [];

			for (var i in ss)
				if (!(i in methods) &&
					!(scope.document && scope.document.getElementById(ss[i]) != null) &&
					!(typeof(scope.opera) == 'object' && scope.opera.toString() == "[object Opera]" && ss[i] == "onhashchange") &&
					original.indexOf(ss[i]) == -1)
					leaks.push(ss[i]);
			
			return leaks;
		}
	};
	
  if (typeof(window) !== 'undefined') {
    window.scopeleaks = methods;
  } else if (typeof(exports) !== 'undefined') {
    exports.leaks = methods.leaks;
  }
  
	snapshot();
	
})(typeof global !== "undefined" ? global : window);
