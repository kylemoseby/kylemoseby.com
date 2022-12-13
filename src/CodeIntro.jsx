import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";
import {
  ImGithub,
  ImCodepen,
  ImEnlarge2,
  ImShrink2,
} from "react-icons/im"
import './App.scss';
import CodePenData from './CodePenData';
import gistData from './gistData';

function ListItem(props) {
  return (
    <li key={props.index} className="px-3 pt-2">
      {props.children}
    </li>
  );
}


function Button(props) {
  return (
    <button type="button" className="btn btn-primary">{props.children}</button>
  );
}

function GistsMenu() {
  return gistData.map((gist, indx) => {
    return (
      <ListItem key={indx}>
        <Link to={'gist/' + gist.id}>
          <h3><ImGithub/>{gist.title}</h3>
        </Link>
      </ListItem>
    );
  })
}

const tagSet = new Set(CodePenData.map(d => d.tags).flat());

function Code() {

  const [showTags, toggleTags] = useState(false);
  const [filterTags, updateFilters] = useState([...tagSet]);

  function showPenTags(tags) {
    filterTags.every(t => {
      if (tags.contains(t)) {
        return false;
      }
    });
    return true;
  }

  function Pentags(props) {
    return (
      <div>{props.tags.map((tag, indx) => {
        return (<span key={indx}>{indx !== 0 ? '/' : ''}&nbsp;{tag}&nbsp;</ span>)
      })}</div>
    );
  }

  function PenItem(props) {
    const { info: { slugHash }, info: { title }, info: { tags } } = props;
    return (
      <Link to={'pen/' + slugHash}>
        <h3><ImCodepen/>{title}</h3>
        <Pentags tags={tags} />
      </Link>
    );
  }

  function PenExmplMenu(props) {
    return CodePenData.map((pen) => {
      let showTags = showPenTags(pen.tags);
      return (
        <div>
          {test &&
            <ListItem key={pen.slugHash}>
              <PenItem info={pen} showTags={showTags} />
            </ListItem>
          }
        </div>
      );
    });
  }

  function removeTag(tag) {
    tagSet.delete(tag);
    updateFilters([...tagSet]);
  }

  function removeTag(tag) {
    tagSet.add(tag);
    updateFilters([...tagSet]);
  }

  const tags = [...tagSet].map(tag => {
    return <span key={tag} onClick={removeTag(tag)}>{tag} {filterTags.includes(tag) ? 'not' : 'filtered'}</span>
  });

  function tagClick() {
    console.log('tagClick');
    toggleTags(!showTags);
  }


  return (
    <div className="col">

      <h3>Tags</h3>
      {tags}<br/>
      filtered :{filterTags.map(t => <span>{t}</span>)}
      <Button>
        <span>updateFilters (uniqueTags) Clear Filters</span>
      </Button>

      <Button>
        <div onClick={tagClick}>
          {showTags ? <ImEnlarge2 /> : <ImShrink2 />}
        </div>
      </Button>

      <ul className="list-unstyled">
        <PenExmplMenu showTags={showTags} />
        <GistsMenu/>
      </ul>

    </div>
  );
}

export default Code;
