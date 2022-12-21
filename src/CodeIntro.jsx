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
import CodePenEmbed from './CodePenEmbed';


function ListItem(props) {
  return (
    <li key={props.index} className="px-3 pt-2">
      {props.children}
    </li>
  );
}

function Button(props) {
  let { colour, children } = props;
  return (
    <button type="button" className={"btn btn-sm btn-" + (colour ? colour : 'primary')}>{children}</button>
  );
}

function randomIndex() {
  return Math.floor(Math.random * 999999999999);
}

const tagSet = new Set(CodePenData.map(d => d.tags).flat());

const coolPenIDs = ['GRQOQEw', 'MWVRLWN', 'RwyrzKm', 'MWXabbG'];

function Code() {

  const [showTags, toggleTags] = useState(true);
  const [showGithub, toggleGithub] = useState(true);
  const [showCodepen, toggleCodepen] = useState(true);
  const [filterTags, updateFilters] = useState([]);

  function CodeTags(props) {
    return (
      <div className="display-inline">{props.tags.map((tag, indx) => {
        return (<span key={indx  + '-' + randomIndex()}>{indx !== 0 ? '/' : ''}&nbsp;{tag}&nbsp;</ span>)
      })}</div>
    );
  }

  function PenExmplMenu(props) {
    return props.penData.map((pen) => {
      let { slugHash, title, tags } = pen;
      if (filterTags.every(d => !tags.includes(d))) {
        return (
          <ListItem>
          <Link to={'pen/' + slugHash}>
            <h3><ImCodepen/>{title}</h3>
          </Link>
          {showTags && <CodeTags tags={tags} />}
        </ListItem>
        );
      };
    });
  }

  function GistsMenu(props) {
    return props.gistData.map((gist) => {
      let { id, title, tags } = gist;
      return (
        <ListItem key={id}>
        <Link to={'gist/' + id}>
          <h3><ImGithub/>{title}</h3>
        </Link>
        {showTags && <CodeTags tags={tags} />}
      </ListItem>
      );
    })
  }
  const tags = [...tagSet].map((tag, indx) => {
    return (
      <div key={indx + '-' + randomIndex()} className={"btn btn-" + (filterTags.includes(tag) ? "secondary" : "primary") + " btn-sm"} onClick={() => {toggleTag(tag)}}>
        {tag}
      </div>);
  });

  // EVENT HANDLERS
  function toggleTag(tag) {
    let filtered = new Set(filterTags);

    if (!filtered.has(tag)) {
      filtered.add(tag)
    } else {
      filtered.delete(tag)
    };

    updateFilters([...filtered]);
  }

  function tagClick() {
    toggleTags(!showTags);
  }

  function clearFilters() {
    debugger;
    updateFilters([]);
    // toggleGithub(true)
    // toggleCodepen(true)
  }

  function clickGithub() {
    toggleGithub(!showGithub)
  }

  function clickCodepen() {
    toggleCodepen(!showCodepen)
  }

  let coolPen = coolPenIDs.at(Math.floor(Math.random() * coolPenIDs.length));

  return (
    <div className="row">
      <div className="col">
        <CodePenEmbed slugHash={coolPen} />
        <p><Link to={'pen/' + coolPen}>Click more info.</Link></p>
        <div className="d-flex flex-wrap">
          <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
            Filter by tag: {tags}
          </div>
        </div>
        <Button>
          <div onClick={clearFilters}>Clear Filters</div>
        </Button>
        <Button colour="primary">
          <div onClick={tagClick}>
            {showTags ? <ImEnlarge2 /> : <ImShrink2 />}
          </div>
        </Button>
        <ul className="list-unstyled">
          {showCodepen &&
            <PenExmplMenu penData={CodePenData} />
          }
          {showGithub &&
            <GistsMenu gistData={gistData} />
          }
        </ul>
      </div>
    </div>
  );
}

export default Code;
