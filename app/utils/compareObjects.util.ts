interface ICustomField {
  field: string;
  value: string;
}

export const compareObjects = (obj1: any, obj2: any, customFields: ICustomField[]): boolean => {
  let newObj = obj2;
  customFields.forEach(({field, value}) => {
    newObj = {...newObj, [field]: value}
  })
  let flag = true
  let assert = (_obj1: any, _obj2: any) => {
    for (let item in _obj1) {
      if (_obj1.hasOwnProperty(item)) {
        if (Array.isArray(_obj2[item]) && Array.isArray(_obj1[item])) {
          _obj1[item].sort(sortFunction)
          _obj2[item].sort(sortFunction)
        }
        if (_obj1[item] instanceof Object) {
          assert(_obj1[item], _obj2[item])
          continue
        }
        if (!_obj1[item]) {
          _obj1[item] = null
        }
        if (!_obj2[item]) {
          _obj2[item] = null
        }
        if (_obj1[item] !== _obj2[item]) {
          flag = false
        }
      }
    }
    return flag
  }
  return assert(obj1, newObj)
}

const sortFunction = (a: any, b: any) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}
