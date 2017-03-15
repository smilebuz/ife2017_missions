var contents = ["10","3","7","12","11","10"];
var contentList = document.getElementById("content_list");
//清空队列
function clearQueue() {
  while (contentList.hasChildNodes()) {
    contentList.removeChild(contentList.firstChild);
  }
}
//显示数组
function queueSimulation() {
  for (var i = 0; i < contents.length; i++) {
    var content = contents[i];
    var list_item = document.createElement("li");
    var list_text = document.createTextNode(content);
    list_item.appendChild(list_text);
    contentList.appendChild(list_item);
    console.log("display");
    list_item.onclick = removeItem;
  }
}
//点击列表项删除
function removeItem() {
  var listItems = contentList.children;
  var index = 0;
  //找出当前点击子元素位置
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i] === this) {
      index = i;
    }
  }
  console.log("子元素位置:"+index);
  //从列表中和数组中分别移除点击项
  contentList.removeChild(this);
  contents.splice(index,1);
  console.log(contents);
}
//左侧入
function firstIn() {
  var input = document.getElementById("user_input").value;
  if (input === "") {
    alert("请输入有效内容");
    return false;
  }else {
    clearQueue();
    //输入正则
    var pattern_input = new RegExp("[,，\\.\\\n、 　]","g");
    //正则分隔输入字符串
    inputs = input.split(pattern_input);
    for (var i = 0; i < inputs.length; i++) {
      console.log("输入"+i+": "+inputs[i]);
      contents.unshift(inputs[i]);
    }
    queueSimulation();
  }
}
//右侧入
function lastIn() {
  var input = document.getElementById("user_input").value;
  if (input === "") {
    alert("请输入有效内容");
    return false;
  } else {
    //输入正则
    var pattern_input = new RegExp("[,，\\.\\\n、 　]","g");
    //正则分隔输入字符串
    inputs = input.split(pattern_input);
    clearQueue();
    for (var i = 0; i < inputs.length; i++) {
      console.log("输入"+i+": "+inputs[i]);
      contents.push(inputs[i]);
    }
    queueSimulation();
  }
}
//左侧出
function firstOut() {
  clearQueue();
  var first_content = contents[0];
  contents.shift(first_content);
  queueSimulation();
}
//右侧出
function LastOut() {
  clearQueue();
  var last_content = contents[contents.length-1]
  contents.pop(last_content);
  queueSimulation();
}
//搜索内容
function searchMatch() {
  var searchInput = document.getElementById("search_content").value;
  //遍历元素标签,判断标签内文本节点内容与输入内容是否匹配
  var items = document.getElementsByTagName("li");
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var item_text = item.firstChild.nodeValue;
    //创建匹配正则表达式，不区分大小写
    var pattern = new RegExp(searchInput,"gi");
    if (pattern.test(item_text)) {
      console.log("match!");
      addClass(item,"highlight");
    }
  }
}
//自定义为标签添加类的方法
function addClass(element,newClassName) {
  var className = element.className;
  className = className + " " + newClassName;
  element.className = className;
}
//初始化按钮绑定事件
function btnInit() {
  var leftInBtn = document.getElementById("left_in_btn");
  leftInBtn.onclick = firstIn;
  var rightInBtn = document.getElementById("right_in_btn");
  rightInBtn.onclick = lastIn;
  var leftOutBtn = document.getElementById("left_out_btn");
  leftOutBtn.onclick = firstOut;
  var rightOutBtn = document.getElementById("right_out_btn");
  rightOutBtn.onclick = LastOut;
  var searchBtn = document.getElementById("search_btn");
  searchBtn.onclick = searchMatch;
}
function init() {
  queueSimulation();
  btnInit();
}
init();
