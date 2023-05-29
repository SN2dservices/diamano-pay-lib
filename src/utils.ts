export function objectToParams(object: any) {
  let params = '?';
  if (object) {
    Object.keys(object).forEach((key, index) => {
      if (index == 0 && object[key]) {
        params += `${key}=${object[key]}`;
      } else if (object[key]) {
        params += `&${key}=${object[key]}`;
      }
    });
  }
  return params;
}
