(function() {
  
  var scope = 
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
    this;

  var original = undefined;
  
  var methods = { 
    snapshot: function () {
      var snapshot = new Object();

      for (var i in scope)
        snapshot[i] = 1;

      original = original || snapshot;

      return snapshot;
    },
    leaks: function (snapshot) {
      var ss = snapshot || methods.snapshot();
      var leaks = [];

      for (var i in ss)
        if (
          !(scope.document && scope.document.getElementById(ss[i]) != null) &&
          !(typeof(scope.opera) == 'object' && scope.opera.toString() == "[object Opera]" && ss[i] == "onhashchange") &&
          !original[(i)])
          leaks.push(i);
    
      return leaks;
    }
  };
  
  if (typeof(window) !== 'undefined') {
    window._leaks = methods.leaks;
    window._snapshot = methods.snapshot;
  } else if (typeof(exports) !== 'undefined') {
    exports.leaks = methods.leaks;
    exports.snapshot = methods.snapshot;
  }
  
  methods.snapshot();
  
  return methods;
})();
