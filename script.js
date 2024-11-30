// script.js
let textBox = document.getElementById('text-box');
let canvas = document.getElementById('canvas');
let undoStack = [];

// Add Text
function addText() {
  let newText = prompt('Enter new text:');
  if (newText) {
    undoStack.push(textBox.innerHTML);
    textBox.innerHTML = newText;
  }
}

// Enable Dragging
function enableDrag() {
  let isDragging = false;

  canvas.onmousedown = function (e) {
    isDragging = true;
    let rect = canvas.getBoundingClientRect();
    let offsetX = e.clientX - textBox.offsetLeft - rect.left;
    let offsetY = e.clientY - textBox.offsetTop - rect.top;

    canvas.onmousemove = function (event) {
      if (isDragging) {
        let x = event.clientX - rect.left - offsetX;
        let y = event.clientY - rect.top - offsetY;
        textBox.style.left = `${x}px`;
        textBox.style.top = `${y}px`;
      }
    };

    canvas.onmouseup = function () {
      isDragging = false;
      canvas.onmousemove = null;
      canvas.onmouseup = null;
    };
  };
}

// Change Font/Style
function changeFont() {
  let fontChoice = prompt('Enter font size (e.g., 20px), color (e.g., red), or font-family (e.g., Arial):');
  if (fontChoice) {
    undoStack.push(textBox.style.cssText);
    textBox.style.cssText += fontChoice + ';';
  }
}

// Undo Action
function undo() {
  if (undoStack.length > 0) {
    textBox.style.cssText = undoStack.pop();
  } else {
    alert('No actions to undo!');
  }
}