function defaultArguments(func, defaultParams) {
  const result = function(...args) {
    return func(...args,
      ...String(func)
         .match(/\([^)]*\)/)[0] // get parameters
         .replace(/\/\/[^\n]*/g, '') // remove comments
         .replace(/\/\*[^*]*\*\//g, '') // removed comments
         .replace(/[() \n]/g, '') // remove white space, parens
         .split(',') // array of parameter names
         .map(param => defaultParams[param]) //
         .slice(args.length));
  };
  result.toString = () => func.toString();
  return result;
}
