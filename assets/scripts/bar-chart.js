
//Takes in data: array, options: object, element: DOM element.
//And generates a barchar accordingly.
function drawBarChart(data, element = "#chart", options) {

  clearBarChart(element);

  let yAxis = genY(getScale(data));
  $(element).append(yAxis);

  let bars = genBars(data);
  styleBars(bars, getScale(data));
  $(element).append(bars);

};

//Clears the charting area by removing appended bars.
function clearBarChart(element = "#chart") {
  $(element).empty();
}


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
const styleBars = (arr, scale, align = "center") => {

  let width = 100 / ((arr.length * 2) + 1);
  let cssW = width + "%";
  let gap = width;
  let max = scale;
  let height;

  for (let i in arr) {
    height = ($(arr[i]).html() / max) * 100;
    $(arr[i]).css({
    "display": "inline-block",
    "width": cssW,
    "height": height + "%",
    "text-align": align,
    "position": "absolute",
    "bottom": 0,
    "left": gap + "%",
    "background": "white",
    "box-shadow": "5px 0 10px grey"
    });
    gap += width * 2;
  }
}

//Helper function to get the Maximum value out of data set. And find the y-axis scale accordingly.
const getScale = (arr) => {

  let max = Math.max(...arr);

  if (max < 100) {
    return 10 * Math.ceil(max / 10);
  }
  else if (max < 1000) {
    return 100 * Math.ceil(max / 100);
  }
  else {
    return 1000 * Math.ceil(max / 1000);
  }
}

//Draw y-axis
const genY = (max, num = 4) => {

  let y = [];
  let vertical = $("<div></div>");
  $(vertical).css({
    "height": "100%",
    "width": 2,
    "background": "black",
  });
  y.push(vertical);

  let line;
  let step = max / num;
  for (let i = 1; i < num + 1; i++) {
    line = $("<div></div>");
    $(line).css({
      "width": "100%",
      "height": 2,
      "background": "black",
      "position": "absolute",
      "bottom": ((100 / num) * i) + "%",
      "text-indent" : "3%",
      "line-height": "-20%"
    });
    $(line).attr("class", "y");
    $(line).html(Math.round(step * i));
    y.push(line);
  }

  return y;

}











