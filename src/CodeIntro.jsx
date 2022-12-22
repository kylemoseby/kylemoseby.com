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
  // USESTATES
  const [showTags, toggleTags] = useState(true);

  // ELEMENTS
  function CodeTags(props) {
    return (
      <div className="display-inline">
        {props.tags.map((tag, indx) => {
          return (
            <span
              key={indx  + '-' + randomIndex()}
            >
              {indx !== 0 ? '/' : ''}&nbsp;{tag}&nbsp;
            </span>)
        })}
      </div>
    );
  }

  function PenExmplMenu(props) {
    return props.penData.map((pen) => {
      let { slugHash, title, tags } = pen;
      // Filter pens via tag
      // if (tags.some(d => filterTags.includes(d))) {
        return (
          <ListItem key={slugHash}>
            <Link to={'pen/' + slugHash}>
            <ImCodepen/>{title}
            </Link>
            {showTags && <CodeTags tags={tags} />}
          </ListItem>
        );
      // };
    });
  }

  function GistsMenu(props) {
    return props.gistData.map((gist) => {
      let { id, title, tags } = gist;
      return (
        <ListItem key={id}>
        <Link to={'gist/' + id}>
          <ImGithub/>{title}
        </Link>
        {showTags && <CodeTags tags={tags} />}
      </ListItem>
      );
    })
  }
  // END ELEMENTS

  // EVENT HANDLERS
  function tagClick() {
    toggleTags(!showTags);
  }
  // END EVENT HANDLERS


  let coolPen = coolPenIDs.at(Math.floor(Math.random() * coolPenIDs.length));

  return (
    <div className="row">
      <div className="col-md-12">
        <Button colour="primary">
        <div onClick={tagClick}>
          {showTags ? <ImShrink2 /> : <ImEnlarge2 />}
        </div>
        </Button>
        <ul className="list-unstyled">
          <PenExmplMenu penData={CodePenData} />
          <GistsMenu gistData={gistData} />
        </ul>
      </div>
    </div>
  );
}

/*

  STATES
  const [showGithub, toggleGithub] = useState(true);
  const [showCodepen, toggleCodepen] = useState(true);
  const [filterTags, updateFilters] = useState([]);

  // Toggle TAG class
  className={"text-" + (filterTags.includes(tag) ? 'secondary' : 'primary')}


  // TAG ELEMENTS
  const tagButtons = [...tagSet].map((tag, indx) => {
    return (
      <div
        key={indx + '-' + randomIndex()}
        className={"btn btn-" + (filterTags.includes(tag) ? "secondary" : "primary") + " btn-sm"}
        onClick={() => {toggleTag(tag)}}
      >
        {tag}
      </div>);
  });

  // FILTERING BY TAGS
  <div className="d-flex flex-wrap">
    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
      Filter by tag: {tagButtons}
    </div>
  </div>
  {filterTags.length !== 0 &&
  <Button>
    <div onClick={clearFilters}>Clear Filters</div>
  </Button>}




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
  // END EVENT HANDLERS



*/

// <div className="col">
//   <CodePenEmbed slugHash={coolPen} />
//   <p><Link to={'pen/' + coolPen}>Click more info.</Link></p>
// </div>



export default Code;
