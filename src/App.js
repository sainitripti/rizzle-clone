import React, { Component } from 'react';
import Video from './video';
import {uploads} from './data';
import {Swipe} from './swipe';


export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      uploadIndex: 0,
      isVideoScreen: true
    }; 
    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.goToVideo = this.goToVideo.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
  }

  onSwipeUp(status, event) {
    console.log(`Swipe up with status ${ status }!`, event);
    this.goToVideo(this.state.uploadIndex + 1);
  }
  onSwipeDown(status, event) {
    console.log(`Swipe down with status ${ status }!`, event);
    this.goToVideo(this.state.uploadIndex - 1);
  }
  onSwipeLeft(status, event) {
    console.log(`Swipe left with status ${ status }!`, event);
    let isVideoScreen = false;
    this.changeScreen(isVideoScreen);
  }
  
  onSwipeRight(status, event) {
    console.log(`Swipe right with status ${ status }!`, event);
    let isVideoScreen = true;
    this.changeScreen(isVideoScreen);
  }

  goToVideo (index) {
    let uploadIndex = index;
    if (uploadIndex < 0) {
      uploadIndex = uploads.length - 1;
    } else if (uploadIndex >= uploads.length) {
      uploadIndex = 0;
    }
    this.setState({
      uploadIndex
    });
  }

  changeScreen (isVideoScreen) {
    if(isVideoScreen!==this.state.isVideoScreen){
      this.setState({
        isVideoScreen
      });
    }
  }

  render() {
    const {video, channel} = uploads[this.state.uploadIndex];
    const url = video["originalUrl"];
    const username = channel==null? "Username not available" : channel["user"]["name"];
    if(this.state.isVideoScreen) {
      return ( 
          <Swipe
            onSwipeUp={ this.onSwipeUp }
            onSwipeDown={ this.onSwipeDown }
            onSwipeLeft={ this.onSwipeLeft }
            allowMouseEvents = {true}
            className="panel"
          > 
            <Video url={url} width={window.innerWidth} height={window.innerHeight} />
          </Swipe>
        );
    }
    else {
      return(
          <Swipe
            onSwipeRight={ this.onSwipeRight }
            allowMouseEvents = {true}
          > 
          <div id="creator-name-container"><h1>{username}</h1></div>  
          </Swipe>
      );        
    }
    
  }
}
