let regexp = /{{[A-Z][a-z].}}/g
let currentNodeList = []
/**
 * 解析
 * @param {Element} el Xue绑定的元素
 */
function compile (el) {
  let fragment = document.createDocumentFragment()
  
  currentNodeList.push(fragment)
  
}