var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var selectedImage = null;

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    selectedImage = new Image();
    selectedImage.onload = function(){
      selectedImage = event.target.result;
    };
    selectedImage.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

var gridItems = [];

window.onload = function() {
  var grid = document.getElementById('grid');
  for (var i = 0; i < 100; i++) {
    var gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.onclick = function() {
      if (!this.style.backgroundImage && selectedImage) {
        this.style.backgroundImage = 'url(' + selectedImage + ')';
      } else {
        this.style.backgroundImage = '';
      }
    };
    grid.appendChild(gridItem);
    gridItems.push(gridItem);
  }
};

var saveButton = document.getElementById('saveButton');
var loadButton = document.getElementById('loadButton');

saveButton.onclick = function() {
  var savedData = [];
  for (var i = 0; i < gridItems.length; i++) {
    savedData.push(gridItems[i].style.backgroundImage);
  }
  fetch('save.php', {
    method: 'POST',
    body: JSON.stringify(savedData),
  });
};

loadButton.onclick = function() {
  fetch('load.php')
    .then(response => response.json())
    .then(savedData => {
      for (var i = 0; i < gridItems.length; i++) {
        gridItems[i].style.backgroundImage = savedData[i];
      }
    });
};
