var playground = createPlayground();

console.log(playground);

function isCellFree(shape, cellCoordinates){
  cellIsFree = true
  shapeStrings = []
  shape.forEach(shapePosition => shapeStrings.push(shapePosition.join()))
  
  return (playground[cellCoordinates[0]][cellCoordinates[1]] == undefined || shapeStrings.includes(cellCoordinates.join()))
}

function isAbleToMoveDown(obj){
  var able = true

  for (var i = 0; i < obj.position.length; i++) {
    if(obj.position[i][0] - 1 < 0 || !isCellFree(obj.position, [obj.position[i][0] - 1, obj.position[i][1]])){
      able = false
      break
    }
  }

  return able
}

function moveObjectsDown(){
  for (var i = 0; i < objects.length; i++) { 
    while(isAbleToMoveDown(objects[i])) {
          objects[i].position.forEach(position => (position[0] -= 1))
        }
  }
}

function removeIfNeeded(){
  for (var i = 0; i < playground.length; i++) {
    if(!playground[i].includes(undefined)){
      for (var j = 0; j < objects.length; j++){
        let objStrings = []
        objects[j].position.forEach(position => objStrings.push(position.join()))
        for (var k = 0; k < playground[i].length; k++){
          if(objStrings.includes([i, k].join())){
            console.log(objects[j], objStrings)
            let index = objStrings.indexOf([i, k].join())
            objects[j].position.splice(index, 1)
            objStrings.splice(index, 1)
          }
        }
      }
      
      playground = createPlayground()
      renderPlayground()
      removeIfNeeded()
    }
  }
}

// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down')

  let currentObject = getCurrentObject();

  positions = currentObject.position


  positions.forEach(position => (position[0] -= 1))

  positionStrings = []
  positions.forEach(position => positionStrings.push(position.join()))

  for (var i = 0; i < positions.length; i++) {
    if(positions[i][0] == 0 || !isCellFree(positions, [positions[i][0] - 1, positions[i][1]])){
      
      currentObject.state = 'static'
      playground = createPlayground()
      renderPlayground()
      removeIfNeeded()
      moveObjectsDown()
      console.log(objects)
      createNewObject()
      break
    }
  }
  playground = createPlayground()
  renderPlayground()

  currentObject = getCurrentObject();
  if(!isAbleToMoveDown(currentObject)) { 
    if (confirm("Game is over!")) {
      window.location.reload(false)
    } else {
      window.location.reload(false)
    }
  }
}

function moveRight(obj) {
  console.log('moving right')
  let currentObject = getCurrentObject();
  console.log(currentObject);
  var moveAvailable = true;
  positions = currentObject.position

  for (var i = 0; i < positions.length; i++) {
    if(positions[i][1] + 1 > 4 || !isCellFree(positions, [positions[i][0], positions[i][1] + 1])) moveAvailable = false;
  }

  if(moveAvailable) currentObject.position.forEach(position => (position[1] += 1));

  playground = createPlayground();
  renderPlayground()
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();

  var moveAvailable = true;
  positions = currentObject.position

  for (var i = 0; i < currentObject.position.length; i++) {
    if(positions[i][1] - 1 < 0 || !isCellFree(positions, [positions[i][0], positions[i][1] - 1])) moveAvailable = false;
  }

  if(moveAvailable)currentObject.position.forEach(position => (position[1] > 0  && (position[1] -= 1)));

  playground = createPlayground();
  renderPlayground()
}

function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
}

// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground
createNewObject()
renderPlayground()


// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 4000);