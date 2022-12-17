import React from 'react';
import PageContainer from './PageContainer';
import LinkData from './LinkData';
import './App.scss';

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
    <PageContainer pageName="Links">
      <div className="row">
        <div className="col">
          <LinkTree />
        </div>
      </div>
    </PageContainer>
  );
}

export default Links;
