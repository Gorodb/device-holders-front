export const clearObject = (obj: any) => {
  // const keys = Object.keys(obj);
  for (let key in obj) {
    if (obj[key] === "") {
      delete obj[key];
    }
  }
  return obj
}
