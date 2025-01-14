import React from 'react';

function PageContainer(props){
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>{props.pageName}</h2>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default PageContainer;