
//Takes in data: array, options: object, element: DOM element.
//And generates a bar-chart accordingly.
function drawBarChart(data, element = "#chart", options) {

  //Clears chart
  clearBarChart(element);
  //Creates and display y-axis
  let yAxis = genY(getScale(data));
  $(element).append(yAxis);
  //Creates and display bars
  let bars = genBars(data);
  styleBars(bars, getScale(data));
  styleValue();
  $(element).append(bars);
  //Adds shadow to bars on mousein event
  barShadow();


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
    $(bar).html("<div class='value'>"+data[i]+"</div>");
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
    });
    gap += width * 2;
  }
}

const styleValue = (pos = "center") => {
  $(".value").css({
    "height": "100%",
    "line-height": "100%",
    "text-align": "center"
  });
}

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
}

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

}

//Function to customize the barchart title.
const chartTitle = (title = "Bar Chart", color = "#F4F5F2", size = "2em") => {
  $("#chart-title").html(title);
  $("#chart-title").css({
    "color": color,
    "font-size": size
  });
}

//Hover Shadow
const barShadow = () => {
  $(".bar").mouseenter((e) => {
    if ($(e.target).is(".bar")) {
      $(e.target).css("box-shadow", "0 0 20px grey");
      //console.log("in");
    }
    else {
      $($(e.target).parent()).css("box-shadow", "0 0 20px grey");
    }
  });

  $(".bar").on("mouseleave", (e) => {
      $(e.target).css("box-shadow", "");
      $($(e.target).parent()).css("box-shadow", "");
      //console.log("out");
    });
}










