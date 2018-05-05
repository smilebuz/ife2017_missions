function Xue(options) {
  this.$options = options
  this.$data = options.data
  this.$el = document.querySelector(options.el)
  this.$template = this.$el.cloneNode(true) // 复制节点

  this.observer = new Observer(this.$data)

  this.observer.on('set', this.compile.bind(this)) // bind绑定this对象 否则是window
  
  this.currentNodeList = []
  this.compile()
}

Xue.prototype.compile = function () {
  let fragment = document.createDocumentFragment()
  console.log(this)
  
  this.currentNodeList.push(fragment)

  this._compileNode(this.$template)

  this.$el.parentNode.replaceChild(fragment, this.$el)
  this.$el = document.querySelector(this.$options.el)
}

Xue.prototype._compileElement = function (node) {
  let newNode = document.createElement(node.tagName)

  if (node.hasAttributes()) {
    let attributes = node.getAttributeNames()
    attributes.forEach(attribute => {
      newNode.setAttribute(attribute, node.getAttribute(attribute))
    })
  }

  let currentNode = this.currentNodeList[this.currentNodeList.length - 1].appendChild(newNode)

  if (node.hasChildNodes()) {
    this.currentNodeList.push(currentNode)
    Array.from(node.childNodes).forEach(this._compileNode, this)
  }

  this.currentNodeList.pop()
}

Xue.prototype._compileText = function (node) {
  let nodevalue = node.nodeValue // 内容
  if (nodevalue === "") {
    return
  }

  let regexp = /{{\w+}}/g // 替换正则
  let ret = nodevalue.match(regexp)

  if (!ret) {
    return
  }

  ret.forEach((value) => {
    let property = value.replace(/[{}]/g, '')
    nodevalue = nodevalue.replace(value, this.$data[property])
  }, this)

  this.currentNodeList[this.currentNodeList.length - 1].appendChild(document.createTextNode(nodevalue))
}

Xue.prototype._compileNode = function (node) {
  switch (node.nodeType) {
    case 1:
      // Node
      this._compileElement(node)
      break
    case 3:
      // Text
      this._compileText(node)
      break
    default:
      break
  }
}

function Observer(data) {
  this.data = data
  this.walk(data)
}

Observer.prototype.walk = function (obj) {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      let val = obj[property]
      this.convert(property, val)
    }
  }
}

Observer.prototype.convert = function (key, val) {
  let ob = this
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      console.log('你设置了' + key + ' 新的' + key + ' = ' + newVal)
      ob.notify('set', key, val)
    },
    get: function () {
      return val
    }
  })
}

/**
 * 事件订阅
 * @param {String} type 事件类型
 * @param {Function} fn 回调函数
 */
Observer.prototype.on = function (type, fn) {
  this._events = this._events || {}
  if (this._events[type] === undefined) {
    this._events[type] = []
  }
  this._events[type].push(fn)
}

/**
 * 事件发布
 * @param {String} type 事件类型
 */
Observer.prototype.emit = function (type) {
  this._events = this._events || {}
  if (this._events[type] === undefined || this._events[type].length === 0) {
    return
  }
  let fns = this._events[type]
  fns.forEach(fn => {
    fn()
  })
}

/**
 * 事件触发
 * @param {String} type 事件类型
 * @param {*} key 
 * @param {*} val 
 */
Observer.prototype.notify = function (type, key, val) {
  this.emit(type)
}