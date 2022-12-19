// import React, { useState } from 'react';
// import {
//   Link,
// } from "react-router-dom";
import {
  ImBehance,
} from "react-icons/im"
import './App.scss';
import PhotographyData from './PhotographyData';
// import logo from './logo.png';


// Common wrapper for Codepen and Gist Examples

function PhotoIntro() {
  return (
    <div className="row">
      <div className="col-12">
        <h3>Gallery</h3>
        <a href="https://kylemoseby.myportfolio.com" target="_blank" rel="noreferrer">
          Additional work and client login can be found here.
        </a>
        <a href="https://www.behance.net/kylemoseby">
          <ImBehance />
        </a>

        <Gallery>
          <Thumbnails photoData={PhotographyData} />
        </Gallery>
      </div>
    </div>
  );
}

function Gallery(props) {
  return (
    <div className="d-flex flex-wrap">
      {props.children}
    </div>
  );
}

function Thumbnails(props){
  let rand = Math.floor(Math.random() * props.photoData.length)
  return props.photoData.map((photo, indx) => {
    let {fileName, title} = photo;
    return (
      <div className="thumbnail p-2 flex-fill" key={indx}>
        <img alt ="" src={process.env.PUBLIC_URL + fileName} />
        <div>|{title}|</div>
      </div>
    );
  }).slice(rand, rand + 7);
}

export default PhotoIntro;
