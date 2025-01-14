import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";
import {
  ImBehance,
  ImInstagram,
} from "react-icons/im"
import './App.scss';
import PhotographyData from './PhotographyData';
// import logo from './logo.png';


// Common wrapper for Codepen and Gist Examples

function PhotoIntro() {
  return (
    <div className="row">
      <div className="col-12">
        <a href="https://www.behance.net/kylemoseby" target="_blank" rel="noreferrer">
          <ImBehance />
        </a>
        <a href="https://www.instagram.com/ybesomelyk" target="_blank" rel="noreferrer">
          <ImInstagram />
        </a>
        <Gallery>
          <Thumbnails photoData={PhotographyData} />
        </Gallery>
        <p>Additional portfolio and client login can be found <a href="https://kylemoseby.myportfolio.com" target="_blank" rel="noreferrer">
        here</a>.</p>
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

function Thumbnails(props) {
  // Choose a random photo in data
  let rand = Math.floor(Math.random() * props.photoData.length)
  // Photo count to include in gallery preview
  let photoCount = 8;

  return props.photoData.map((photo, indx) => {
    let { fileName, title } = photo;
    return (
      <div className="thumbnail p-2 flex-fill" key={indx}>
        <img alt ="" src={process.env.PUBLIC_URL + fileName} />
        <div>|{title}|</div>
      </div>
    );
  }).slice(rand, rand + photoCount);
}

export default PhotoIntro;
