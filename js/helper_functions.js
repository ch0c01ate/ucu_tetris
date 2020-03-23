var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));
var createNewObject = () => objects.push(JSON.parse(JSON.stringify(shapes[Math.floor(Math.random()*shapes.length)])));