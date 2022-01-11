function CurryIt(func) {
  let curriedFunc = func;
  let firstCall = true;

  return function(...params) {
    if (params.length == 0) {
      let oldFunc = curriedFunc;
      curriedFunc = func;
      return oldFunc(...params);
    }

    if (firstCall) {
      firstCall = false;
      curriedFunc = curriedFunc.bind(this, ...params);
    } else {
      curriedFunc = curriedFunc.bind(null, ...params);
    }
  }
}
