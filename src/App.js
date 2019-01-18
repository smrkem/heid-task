import React, { Component } from 'react';
import './App.css';
import TaskManager from './components/TaskManager/TaskManager'
import Header from './components/Header/Header';

// preload images
import figurePondering from './components/Survey/components/FigurePondering/figure_pondering.png'
import issues from './components/Survey/Issues/Issues'

      
const PreloadedImages = (props) => {
  // console.log('fP:', figurePondering);
  const inlineImages = issues.map(iss => iss.image_src);
  inlineImages.push(figurePondering);
  // console.log('images', inlineImages);
  // console.log('images', inlineImages);

  return (
    <div id="preloaded_images">
      { inlineImages.map(imageSrc => (
        <img src={imageSrc} key={imageSrc} alt="preload" />
      ))}
    </div>
  )
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <TaskManager />        
        </div>
        <PreloadedImages />
      </div>
    );
  }
}

export default App;
