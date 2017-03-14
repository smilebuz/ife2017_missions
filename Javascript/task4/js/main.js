var numbers = ["10","3","7","12","11","10"];
var numberList = document.getElementById("number_list");
var body = document.getElementsByTagName("body")[0];
//清空队列
function clearQueue() {
  while (numberList.hasChildNodes()) {
    numberList.removeChild(numberList.firstChild);
  }
}
//显示数组
function queueSimulation() {
  for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    var list_item = document.createElement("li");
    var list_text = document.createTextNode(number);
    list_item.appendChild(list_text);
    numberList.appendChild(list_item);
    console.log("display");
    list_item.onclick = removeItem;
  }
}
//点击列表项删除
function removeItem() {
  var listItems = numberList.children;
  var index = 0;
  //找出当前点击子元素位置
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i] === this) {
      index = i;
    }
  }
  console.log("子元素位置:"+index);
  //从列表中和数组中分别移除点击项
  numberList.removeChild(this);
  numbers.splice(index,1);
  console.log(numbers);
}
//左侧入
function firstIn() {
  var input_number = document.getElementById("input_number").value;
  if (input_number==="") {
    return false;
  }else {
    clearQueue();
    numbers.unshift(input_number);
    queueSimulation();
  }
}
//右侧入
function lastIn(number) {
  var input_number = document.getElementById("input_number").value;
  if (input_number === "") {
    return false;
  } else {
    clearQueue();
    numbers.push(input_number);
    queueSimulation();
  }
}
//左侧出
function firstOut() {
  clearQueue();
  var first_number = numbers[0];
  numbers.shift(first_number);
  queueSimulation();
}
//右侧出
function LastOut() {
  clearQueue();
  var last_number = numbers[numbers.length-1]
  numbers.pop(last_number);
  queueSimulation();
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
}
//
function init() {
  queueSimulation();
  btnInit();
}
init();
