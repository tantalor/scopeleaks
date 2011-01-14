(function(scope) {
	
	var original = undefined;
	
	var methods = {
		snapshot: function() {
			var snapshot = [];

			for (var i in scope)
				snapshot.push(i);

			original = original || snapshot;

			return snapshot;
		},
		
		leaks: function(snapshot) {
			var ss = snapshot || methods.snapshot();
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
    exports.snapshot = methods.snapshot;
    exports.leaks = methods.leaks;
  }
  
	methods.snapshot();
	
})(typeof global !== "undefined" ? global : window);
