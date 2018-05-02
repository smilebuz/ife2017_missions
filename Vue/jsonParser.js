/**
 * 简单解析json结构 递归版
 * @param {Object} obj 待解析的对象
 * @param {String} str 键名 location.country
 */
function jsonParser(obj, str) {
  let keys = str.split(".")
  if (keys.length === 1) {
    return obj[keys[0]]
  }
  let key = keys.shift()
  return jsonParser(obj[key], keys.join("."))
}

/**
 * reduce版
 */
function jsonParser2(obj, str) {
  let keys = str.split(".")
  if (keys.length === 1) {
    return obj[keys[0]]
  }
  keys.unshift(obj)
  let value = keys.reduce((prev, curr) => {
    return prev[curr]
  })
  return value
}

let obj = {
  location: {
    country: 'China',
    province: 'Tianjin'
  },
  age: 24
}
let str = "location.country"
console.log(jsonParser(obj, str))
console.log(jsonParser2(obj, str))
