import React from 'react';
import {
  Link,
} from "react-router-dom";
import {
  useParams
} from "react-router-dom";
import './App.scss';
import CodePenData from './CodePenData';
import CodePenEmbed from './CodePenEmbed';

function CodePen() {

  let params = useParams();

  const pen = CodePenData.filter(d => d.slugHash === params.slugHash)[0];

  const penTags = pen.tags.map((tag, indx) => <li className="breadcrumb-item" key={indx}>{tag}</li>);

  return (
    <div className="row">
      <div className="col">
        <h3>{pen.title}</h3>
        <ul className="breadcrumb">
          {penTags}
        </ul>
        <CodePenEmbed slugHash={pen.slugHash} />
        <div>{pen.description()}</div>
        <Link to="/code/">Back to Code Examples</Link>
      </div>
    </div>
  );
}

export default CodePen;