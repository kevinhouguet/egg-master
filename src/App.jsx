import { useState } from 'react'
import './App.css'
import egg from './assets/ph_egg-thin.svg'

function App() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const [color, setColor] = useState('#902020')
  const maxBrushWidth = 50
  const minBrushWidth = 1
  const [brushWidth, setBrushWidth] = useState(minBrushWidth)

  function handleMouseDown(e){
    console.log(e.currentTarget)
    const rect = e.currentTarget.getBoundingClientRect();
    setX(e.clientX - rect.left);
    setY(e.clientY - rect.top);
    setIsDrawing(true)
    // console.log(x)
    // console.log(y)
    // console.log(isDrawing)
  }

  function handleMouseMove(e){
    const rect = e.currentTarget.getBoundingClientRect();
    const context = e.currentTarget.getContext('2d');
    if (isDrawing === true) {
      drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
      setX(e.clientX - rect.left);
      setY(e.clientY - rect.top);
      // console.log(rect.left);
      // console.log(rect.top);
    }
  }

  function handleMouseUp(e){
    const rect = e.currentTarget.getBoundingClientRect();
    const context = e.currentTarget.getContext('2d');
    if (isDrawing === true) {
      drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
      setX(0);
      setY(0);
      setIsDrawing(false);
    }
  }

  function degToRad(degrees) {
    return degrees * Math.PI / 180;
  };

  function drawLine(context, x1, y1, x2, y2){
    // console.log(x1, y1, x2, y2)
    // console.log(context);
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, brushWidth, degToRad(0), degToRad(360), false);
    // context.lineWidth = 10;
    // context.moveTo(x1, y1);
    // context.lineTo(x2, y2);
    context.fill();
    context.closePath();
  }

  function handleClickClear(e){
    e.preventDefault()
    const myEgg = document.getElementById('myEgg');
    const context = myEgg.getContext('2d');
    context.clearRect(0,0,myEgg.width,myEgg.height)
  }

  return (
    <>
      <nav>
        <ul>
          <li><a href="" role="button" onClick={handleClickClear}>clear</a></li>
          <li><a href="#" className='title'>Egg-master</a></li>
          <li><a href="#" role="button">share</a></li>
        </ul>
      </nav>
      <div className='App'>
        <canvas id="myEgg"
          width="380px"
          height="360px"
          onMouseDown={handleMouseDown} 
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
      <div className="footer">
        <div className="colorpicker">
          <label>Color :</label>
          <input type="color" name="colorpicker" id="colorpicker" value={color} onChange={(e) => setColor(e.currentTarget.value)}/>
        </div>
        <div className="brushWidth">
          <label>Range slider</label>
          <input type="range" min={minBrushWidth} max={maxBrushWidth} value={brushWidth} id="range" name="range" onChange={(e) => setBrushWidth(e.currentTarget.value)}/>
        </div>
      </div>
    </>
    
  )
}

export default App
