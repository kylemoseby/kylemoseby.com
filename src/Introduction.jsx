import React from 'react';
import { Link } from "react-router-dom";
import {
  ImLocation,
} from "react-icons/im"

import './App.scss';
import pages from './pages';
import LinkData from './LinkData';


function Welcome() {
  return (
    <div className="text-center pt-3 pt-md-5 fs-3">
      Welcome to the personal website of
      <h1 className="display-1 accent-font">Kyle Moseby</h1>
    </div>
  );
}


function PageLinks() {
  return (
    <div className="menu d-sm-flex justify-content-center">
      { pages.filter(d => d.title !== 'Home')
        .map((_l, indx) => {
          return (
            <div className="d-inline-flex display-5 py-2 px-3 fw-bold text-uppercase" key={indx}>
              <Link to={_l.path} className="text-white text-decoration-none hover-linethrough">{_l.title}</Link>
            </div>
          );
        }) }
    </div>
  );
}


function SiteIntro() {
  return (
    <ul className="list-unstyled display-6 fw-bold">
      <li>Developer</li>
      <li>
        <ul className="list-unstyled mx-3">
          <li>JavaScript</li>
          <li>LAMP</li>
          <li>Python</li>
        </ul>
      </li>
      <li className="pt-3"><ImLocation/>Seattle, Washington</li>
    </ul>
  );
}


function SocialMedia(props) {
  return LinkData.map((link, indx) => {
    return (
      <div className="" key={indx}>
        <a href={link.url} className="text-black display-6 py-4 hover-linethrough"  target="_blank" rel="noreferrer">
          {link.icon}
        </a>
      </div>
    )
  });
}


function Introduction() {
  return (
    <div className="grad-background row">
      <div className="col-12">
        <Welcome />
      </div>
      <div className="col-12">
        <PageLinks />
      </div>
      <div className="col-12">
        <div className="d-flex justify-content-center pt-2 pt-md-3">
          <SiteIntro />
        </div>
      </div>
      <div className="col-12">
        <div className="d-flex justify-content-evenly align-items-end pt-2 pt-md-3">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}

export default Introduction;