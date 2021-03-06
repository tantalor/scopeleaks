(function() {
  
  var scope = 
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
    this;

  var original = undefined;
  
  var scopeleaks = { 
    snapshot: function () {
      var snapshot = new Object();

      for (var i in scope)
        snapshot[i] = 1;

      original = original || snapshot;

      return snapshot;
    },
    leaks: function (snapshot) {
      var ss = snapshot || scopeleaks.snapshot();
      var leaks = [];

      for (var i in ss)
        if (
          !(scope.document && scope.document.getElementById(i) != null) &&
          !(typeof(scope.opera) == 'object' && scope.opera.toString() == "[object Opera]" && i == "onhashchange") &&
          !original[(i)])
          leaks.push(i);
    
      return leaks;
    }
  };
  
  if (typeof(window) !== 'undefined') {
    window.scopeleaks = scopeleaks;
  } else if (typeof(exports) !== 'undefined') {
    exports.leaks = scopeleaks.leaks;
    exports.snapshot = scopeleaks.snapshot;
  }
  
  scopeleaks.snapshot();
  
  return scopeleaks;
})();
