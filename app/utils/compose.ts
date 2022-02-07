const compose = (...functions: any[]): any => (comp: any): any => {
  return functions.reduceRight(
    (wrapped, f) => f(wrapped), comp
  );
};

export default compose;
