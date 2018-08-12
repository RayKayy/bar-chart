//Variables for testing/debugging.
// var labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
// var testd = [1000, 2345, 888, 789, 3456, 7892, 1111, 7321];
// var theme = ["#05668D", "#028090", "#00A896", "#00A896", "#F0F3BD"];
// var standard = {height: "75vh", width: "95%"};
// var chart = "#chart";




///////////////////////////////////////////////////////////////////
//Main function to draw a stacked bar chart; based on the draw bar chart function.
//Takes in a nested array as data, a DOM element as container and a js object as options.
function drawStackedBarChart(data, element = $(chart), options = opt) {

  //Clears chart
  clearBarChart(element);
  //Apply options.
  for (let x in options) {
    $(element).css(x, options[x]);
  }
  //Create base chart array
  let base = genBase(data);
  //Creates and display y-axis
  let yAxis = genY(getScale(base));
  $(element).append(yAxis);
  //Creates bars, values and labels accordingly.
  let bars = genBars(base);
  styleBars(bars, getScale(base));
  //Create, style and append inner stacked bars
  let sBars = genSBars(data);
  styleSBars(bars, sBars);
  appendSB(bars, sBars);
  //Append and display bars in container.
  $(element).append(bars);
  styleValue();
  //Adds shadow to bars on mousein event
  barShadow();



}

//Style the innser stacked bars according to their parent.
const styleSBars = (bars, stacked) => {

  let ov;
  let iv;
  let height;

  for (let i = 0; i < bars.length; i++) {
    ov = $($(bars[i]).html()).html();
    for (let j = 0; j < stacked[i].length; j++) {
      iv = $($(stacked[i][j]).html()).html();
      height = (iv / ov) * 1000;
      height = Math.ceil(height) / 10;
      $(stacked[i][j]).css({
        "height": height + "%",
        "background": theme[j]
      });
    }
  }
}


//Append the inner stacked bars matching the main bars.
const appendSB = (main, stacked) => {
  for (let b in main) {
    $(main[b]).append(stacked[b]);
  }
}

//Generate an nested array of DOM elements.
const genSBars = (sData) => {

let sArr = [];

for (let a in sData) {
  sArr.push(genStack(sData[a]));
}
return sArr;
}

//Calculate the total value of each nested array; return an array of those values.
const genBase = (data) => {

  let base = data.map((a) => {
    return a.reduce((t, cv) => {return t + cv});
  });
return base;
}

//Generate the inner elements of stacked bars.
const genStack = (values) => {

  let bar;
  let stack = [];

  for (let i = 0; i < values.length; i++) {
    bar = $("<div></div>");
    $(bar).attr("class", "stackedbar");
    $(bar).append("<div class='ivalue'>"+values[i]+"</div>");
    stack.push(bar);
  }
  return stack;
};


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Takes in data: array, options: object, element: DOM element.
//And generates a bar-chart accordingly.
function drawBarChart(data, element = $(chart), options = opt) {

  //Clears chart
  clearBarChart(element);
  //Apply options.
  for (let x in options) {
    $(element).css(x, options[x]);
  }
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


}

//Clears the charting area by removing appended bars.
function clearBarChart(element = $(chart)) {
  $(element).empty();
}


//Generate an array of div.bar elements nested with .bar.value and .bar.label to be appended within DOM element using array of values.
//Label is an array of strings or values to be associated with the bar.
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
const styleBars = (arr, scale, step = -1, color = "#B8CEFF") => {

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
    "color": color
    });
    if (step < 0) {
      gap += width + width;
    }
    else {
      gap += width + step;
    }
  }
};

//Helper function used to style values.
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

// //Function to customize the barchart title.
// const chartTitle = (ele, title, color, size) => {
//   $(id).html(title);
//   $(id).css({
//     "color": color,
//     "font-size": size
//   });
// };

//Hover Shadow
const barShadow = () => {
  $(".bar").mouseenter((e) => {
    $(e.currentTarget).css("box-shadow", "0 0 20px grey");
  });

  $(".bar").mouseleave((e) => {
    $(e.currentTarget).css("box-shadow", "");
  });
  $(".stackedbar").mouseenter((e) => {
    $(e.currentTarget).css({
      "box-shadow": "0 0 30px grey",
      "z-index": "100"
      });
  });

  $(".stackedbar").mouseleave((e) => {
    $(e.currentTarget).css({
      "box-shadow": "",
      "z-index": ""
    });
  });
};

//Change Color thorugh window prompt.
const promptCustomize = (id = "custom") => {

  let customize = document.getElementById(id);

  if (customize.checked) {
    $(".chart-title").click((e) => {
      let title = prompt("Enter new chart title:", $(e.currentTarget).html());
      let color = prompt("Enter the hexadecimal, RGB, or color name:", $(e.currentTarget).css("color"));
      let size = prompt("Enter new font size:", $(e.currentTarget).css("font-size"));

      $(e.currentTarget).html(title);
      $(e.currentTarget).css("color", color);
      $(e.currentTarget).css("font-size", size);
      // chartTitle(title, color, size);
    });
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
    $(".stackedbar").click((e) => {
      let color = prompt("Bar Section - Please enter the hexadecimal, RGB, or color name:");
      if (color !== "") {
        $(e.currentTarget).css("background", color);
      }
    });
    $(".ivalue").click((e) => {
      let color = prompt("Inner Value - Please enter the hexadecimal, RGB, or color name:");
      if (color !== "") {
        $(e.currentTarget).css("color", color);
      }
      e.stopPropagation();
    });
  }
  else {
    $(".stackedbar, .ivalue, .label, .value, .chart-title").off("click");
  }
}











