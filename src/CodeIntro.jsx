import React from 'react';
import {
  Link,
} from "react-router-dom";
import {
  ImGithub,
  ImCodepen,
} from "react-icons/im"
import './App.scss';
import CodePenData from './CodePenData';
import gistData from './gistData';

function ListItem(props){
  return (
    <li key={props.index} className="px-3 pt-2">
      {props.children}
    </li>
  );
}

function PenExmplMenu() {
  return CodePenData.map((pen, indx) => {
    return (
      <ListItem key={indx}>
        <Link to={'pen/' + pen.slugHash}>
          <h3 className="px-1" ><ImCodepen/>{pen.title}</h3>
        </Link>
      </ListItem>
    );
  });
}

function GistsMenu() {
  return gistData.map((gist, indx) => {
    return (
      <ListItem key={indx}>
        <Link to={'gist/' + gist.id}>
          <h3 className="px-1" ><ImGithub/>{gist.title}</h3>
        </Link>
      </ListItem>
    );
  })
}

function Code() {

  return (
    <div className="col">
      <ul className="list-unstyled">
        <PenExmplMenu/>
        <GistsMenu/>
      </ul>
    </div>
  );
}

export default Code;