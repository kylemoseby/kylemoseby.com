import React from 'react';
import './App.scss';
import LinkData from './LinkData';

function LinkTree() {
  const buttons = LinkData.map((link, indx) => {
    return (
      <div key={indx} className="col d-grid">
        <a href={link.url}
          className="btn btn-primary btn-lg"
          type="button"
          target="_blank"
          rel="noreferrer"
        >
          {link.icon}&nbsp;&nbsp;
          {link.title}
        </a>
      </div>
    )
  });

  return (
    <div className="row row-cols-1 row-cols-md-3 ">
      {buttons}
    </div>
  );
}


function Links() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>Links</h2>
          <LinkTree />
        </div>
      </div>
    </div>
  );
}

export default Links;