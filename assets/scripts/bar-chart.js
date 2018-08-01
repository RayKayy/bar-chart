//Variables for testing/debugging.
var labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
var testd = [1000, 2345, 888, 789, 3456, 7892, 1111, 7321];


//Takes in data: array, options: object, element: DOM element.
//And generates a bar-chart accordingly.
function drawBarChart(data, element = "#chart", options = "default") {

  //Clears chart
  clearBarChart(element);
  //Creates and display y-axis
  let yAxis = genY(getScale(data));
  $(element).append(yAxis);
  //Creates and display bars, values and labels accordingly.
  let bars = genBars(data);
  styleBars(bars, getScale(data));
  $(element).append(bars);
  styleValue();
  //Adds shadow to bars on mousein event
  barShadow();
  //promptColor();


}

//Clears the charting area by removing appended bars.
function clearBarChart(element = "#chart") {
  $(element).empty();
}


//Generate an array of div.bar elements nested with .bar.value and .bar.label to be appended within DOM element using array of values.
//Label is an array of string or values to be associated with the bar.
const genBars = (values, label = labels) => {

  let bar;
  let barsArr = [];

  for (let i = 0; i < values.length; i++) {
    bar = $("<div></div>");
    $(bar).attr("id", "bar-"+i);
    $(bar).attr("class", "bar");
    $(bar).append("<div class='value'>"+values[i]+"</div>");
    $(bar).append("<div class='label'>"+label[i]+"</div>");
    barsArr.push(bar);
  }
  return barsArr;
};

//Style an array of DOM elements using jQuery according to data set.
const styleBars = (arr, scale, color = "#B8CEFF") => {

  let width = 100 / ((arr.length * 2) + 1);
  let cssW = width + "%";
  let gap = width;
  let max = scale;
  let value;
  let height;
  //let step = 5;

  for (let i in arr) {
    value = $($(arr[i]).html()).html();
    height = (value / max) * 100;
    $(arr[i]).css({
    "display": "inline-block",
    "width": cssW,
    "height": height + "%",
    "position": "absolute",
    "bottom": 0,
    "left": gap + "%",
    "background": color,
    "color": color
    });
    gap += width * 2;
  }
};

const styleValue = (pos = "center", color = "black") => {
  if (pos === "center") {
    $(".value").css({
      "color": color,
      "width": "100%",
      "text-align": "center",
      "position": "absolute",
      "bottom": "45%",
      "top": ""
    });
  }
  else if (pos === "top") {
    $(".value").css({
      "color": color,
      "width": "100%",
      "text-align": "center",
      "position": "absolute",
      "bottom": "",
      "top": 0
    });
  }
  else if (pos === "bottom") {
    $(".value").css({
      "color": color,
      "width": "100%",
      "text-align": "center",
      "position": "absolute",
      "bottom": 0,
      "top": ""
    });
  }

};

//Helper function to get the Maximum value out of data set. And find the y-axis scale accordingly.
const getScale = (arr) => {

  let max = Math.max(...arr);

  if (max < 100) {
    return 10 * Math.ceil(max / 10);
  }
  else if (max < 5000) {
    return 100 * Math.ceil(max / 100);
  }
  else {
    return 1000 * Math.ceil(max / 1000);
  }
};

//Helper function to generate a list of DOM elements for the y-axis.
const genY = (max, num = 10) => {

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
      "text-indent" : "1%",
    });
    $(line).attr("class", "y");
    $(line).html(Math.round(step * i));
    y.push(line);
  }

  return y;

};

//Function to customize the barchart title.
const chartTitle = (title = "Bar Chart", color = "#F4F5F2", size = "2em") => {
  $("#chart-title").html(title);
  $("#chart-title").css({
    "color": color,
    "font-size": size
  });
};

//Hover Shadow
const barShadow = () => {
  $(".bar").mouseenter((e) => {
    $(e.currentTarget).css("box-shadow", "0 0 20px grey");
  });

  $(".bar").mouseleave((e) => {
    $(e.currentTarget).css("box-shadow", "");
  });
};

//Change Color thorugh window prompt.
const promptCustomize = (input) => {
  if (input == "on") {
    $(".label").click((e) => {
      let color = prompt("Label/Bar - Please enter the hexadecimal, RGB, or color name:");
      if (color !== "") {
        $(e.currentTarget).css("color", color);
        $(e.currentTarget).parent().css("background", color);
      }
    });
    $(".value").click((e) => {
      let color = prompt("Value - Please enter the hexadecimal, RGB, or color name:");
      if (color !== "") {
        $(e.currentTarget).css("color", color);
      }
    });
  }
  else if (input == "off") {
    $(".label, .value").off();
  }
};










