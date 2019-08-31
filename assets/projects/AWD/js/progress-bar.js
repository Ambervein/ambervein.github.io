(function() {

document.addEventListener("scroll", scrollDetection);

function scrollDetection() {
  let documentHeight = document.documentElement.scrollHeight;
  let documentPosition = window.pageYOffset;
  let windowHeight = document.documentElement.clientHeight;
  
  let bar_width = (documentPosition*100)/(documentHeight-windowHeight);
  let bar_width_px = Math.round(bar_width) + "%";
  document.getElementById("bar").style.width = bar_width_px;
  //document.getElementById("bar").innerHTML = bar_width_px;
}

})();