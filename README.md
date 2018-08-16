# Bar-chart.js
## About
This simple library allows users to generate simple bar charts within the DOM.
Integrated event handling of chart elements within the DOM also provide easy customization.
Can be used on both arrays of integers and nested arrays of integers for standard bar charts and stacked bar charts accordingly.

## Example Screenshots
![Image](https://preview.ibb.co/h50KwU/Screen_Shot_2018_08_14_at_10_01_53_PM.png)
![Image](https://preview.ibb.co/dCmL39/Screen_Shot_2018_08_14_at_10_07_07_PM.png)
![Image](https://preview.ibb.co/eeAKwU/Screen_Shot_2018_08_14_at_10_09_17_PM.png)

## API Functions
1. `drawBarChart(data, element, options)`    
    * `data`: an array of integers;  
    * `options`: an object containing properties such as height and width;  
    * `element`: a jQuery DOM element to inject the chart into.  

2. `drawStackedBarChart(data, element = $(chart), options = opt)`
    * `data`: a nested array of integers;  
    * `options`: an object containing properties such as height and width;  
    * `element`: a jQuery DOM element to inject the chart into.  
3. `styleValue = (pos = "center", color = "black")`
    * `pos`: string representing where the values should be positioned ("center", "top", "bottom")
    * `color`: string representing the intended colour of values.


## Features
* Easy to use and scales with browser window.
* Highly customizable within browser.
* Stacked bar charts generates the base chart based on the total sum of values.
* Can add feature to hide stacked bars to show their total value of the stack.

## Acknowledgement
https://www.w3schools.com/jquery/  
https://jquery.com/  
https://stackoverflow.com/  
https://www.youtube.com/user/TechGuyWeb
