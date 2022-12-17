// import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";
import {
  ImBehance,
} from "react-icons/im"
import './App.scss';
import PhotographyData from './PhotographyData';
// import logo from './logo.png';


// Common wrapper for Codepen and Gist Examples

function PhotoIntro() {
  return (
    <div>
      <Link to="https://www.behance.net/kylemoseby">
        <ImBehance />
      </Link>
      <Gallery photoData={PhotographyData} />
    </div>
  );
}

function Gallery(props) {

  const thumbnails = props.photoData.map((photo) => {
    let {fileName, title} = photo;
    return (
      <div className="p-2">
        <img className="thumbnail" src={process.env.PUBLIC_URL + fileName} />
        <div>|{title}|</div>
      </div>
    );
  });

  return (
    <div className="col-12">
      <h3>Gallery</h3>
      <div className="d-flex align-items-start">
        {thumbnails}
      </div>
    </div>
  );
}

export default PhotoIntro;
