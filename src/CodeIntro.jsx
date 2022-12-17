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

// Common wrapper for Codepen and Gist Examples
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

const tagSet = new Set(CodePenData.map(d => d.tags).flat());

function Code() {

  const [showTags, toggleTags] = useState(false);
  const [showGithub, toggleGithub] = useState(true);
  const [showCodepen, toggleCodepen] = useState(true);
  const [filterTags, updateFilters] = useState([]);

  function Pentags(props) {
    return (
      <div>{props.tags.map((tag, indx) => {
        return (<span key={tag}>{indx !== 0 ? '/' : ''}&nbsp;{tag}&nbsp;</ span>)
      })}</div>
    );
  }

  function PenItem(props) {
    const { info: { slugHash }, info: { title }, info: { tags } } = props;
    let filtered = new Set(filterTags);
    return (
      <Link to={'pen/' + slugHash}>
        <h3><ImCodepen/>{title}</h3>
        {showTags && <Pentags tags={tags} />}
      </Link>
    );
  }

  function PenExmplMenu(props) {
    let filtered = new Set(filterTags);
    // CHECK LOGIC FOR LEAST AMOUNT OF ITERATIONS
    return CodePenData.map((pen) => {
      return (
        <div key={pen.slugHash}>
        {pen.tags.every(d => !filtered.has(d)) &&
            <ListItem>
              <PenItem info={pen} />
            </ListItem>
        }
        </div>
      );
    });
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

  function toggleTag(tag) {
    let filtered = new Set(filterTags);

    if (!filtered.has(tag)) {
      filtered.add(tag)
    } else {
      filtered.delete(tag)
    };

    updateFilters([...filtered]);
  }

  const tags = [...tagSet].map((tag, indx) => {
    return (
      <div key={indx} onClick={() => {toggleTag(tag)}}>
        {tag}
      </div>);
  });

  function tagClick() {
    toggleTags(!showTags);
  }

  function clearFilters(){
    updateFilters([]);
    toggleGithub(true)
    toggleCodepen(true)
  }
  function clickGithub(){
    toggleGithub(!showGithub)
  }
  function clickCodepen(){
    toggleCodepen(!showCodepen)
  }

  return (
    <div className="row">
      <div className="col">
        <h3>Tags</h3>
        <div>{tags}</div>
        <Button>
          <div onClick={clearFilters}>Clear Filters</div>
        </Button>
        <Button>
          <div onClick={clickCodepen}>
            Codepen
          </div>
        </Button>
        <Button>
          <div onClick={clickGithub}>
            Github Gist
          </div>
        </Button>
        <Button>
          <div onClick={tagClick}>
            {showTags ? <ImEnlarge2 /> : <ImShrink2 />}
          </div>
        </Button>
        <ul className="list-unstyled">
          {showCodepen &&
            <PenExmplMenu />
          }
          {showGithub &&
            <GistsMenu/>
          }
        </ul>
      </div>
    </div>
  );
}

export default Code;
