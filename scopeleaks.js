(function(scope) {
	
	var original = undefined;
	
	var methods = {
		_snapshot: function() {
			var snapshot = [];

			for (var i in scope)
				snapshot.push(i);

			original = original || snapshot;

			return snapshot;
		},
		
		_leaks: function(snapshot) {
			var ss = snapshot || methods._snapshot();
			var leaks = [];

			for (var i in ss)
				if (!(i in methods) && original.indexOf(ss[i]) == -1)
					leaks.push(ss[i]);
			
			return leaks;
		}
	};
	
	for (m in methods)
		scope[m] = methods[m];
	
	
	methods._snapshot();
	
})(typeof global !== "undefined" ? global : window);