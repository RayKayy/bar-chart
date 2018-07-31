
//Takes in data: array, options: object, element: DOM element.
//And generates a barchar accordingly.
function drawBarChart(data, element, options) {

};


//Generate an array of <div id="i" class="bar">value</div> to be appended within DOM element using array of values.
const genBars = (data) => {
  let bar;
  let barsArr = [];
  for (let i = 0; i < data.length; i++) {
    bar = $("<div></div>");
    $(bar).attr("id", i);
    $(bar).attr("class", "bar");
    $(bar).html(data[i]);
    barsArr.push(bar);
  }
  return barsArr;
};

//Style an array of DOM elements using jQuery according to data set.
const styleBars = (arr) => {
  let width = 100 / ((arr.length * 2) + 1);
  let cssW = width + "%";
  let gap = width;
  for (let i in arr) {
    $(arr[i]).css({
    "display": "inline-block",
    "width": cssW,
    "position": "absolute",
    "bottom": 0,
    "left": gap + "%",
    "background": "white"
    });
    gap += width * 2;
  }
}

