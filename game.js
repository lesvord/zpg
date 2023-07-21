var gridItems = [];

window.onload = function() {
  var grid = document.getElementById('grid');
  for (var i = 0; i < 100; i++) {
    var gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    grid.appendChild(gridItem);
    gridItems.push(gridItem);
  }
  fetch('load.php')
    .then(response => response.json())
    .then(savedData => {
      for (var i = 0; i < gridItems.length; i++) {
        gridItems[i].style.backgroundImage = savedData[i];
      }
    });
};

var player = new Image();
player.src = 'png/men.png';
var playerPosition = 0;

setInterval(function() {
  var newPosition = Math.floor(Math.random() * 100);
  gridItems[playerPosition].style.backgroundImage = '';
  gridItems[newPosition].style.backgroundImage = 'url(' + player.src + ')';
  playerPosition = newPosition;
}, 5000);
