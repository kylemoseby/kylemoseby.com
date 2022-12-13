import React from 'react';
import './App.scss';
import LinkData from './LinkData';

function LinkTree() {
  const buttons = LinkData.map((link, indx) => {
    return (
      <li key={indx}>
        <a href={link.url}
          className="btn btn-link btn-lg"
          type="button"
          target="_blank"
          rel="noreferrer"
        >
          <span className="mx-1 fs-3">{link.icon}</span>
          <span className="">{link.title}</span>
        </a>
      </li>
    )
  });

  return (
    <div className="list-unstyled">
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
