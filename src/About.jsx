import React from 'react';
import LinkData from './LinkData';
import './App.scss';

function About() {
  const linkListItems = LinkData.map((link, indx) => {
    return (
      <li key={indx}>
        <a href={link.url} className="text-decoration-none" target="_blank" rel="noreferrer">
          {link.icon} &nbsp;{link.title}
        </a>
      </li>
    )
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>About</h2>
          <div className="">
            <p>I am a techincal and creative consultant with over 20 years experience putting content on the Internet.</p>
            <p>I have worked on teams for big corporations (Microsoft, DR Horton), agencies (POP, GLG), nonprofits, and startups (Tableau).</p>
            <p>I have been apart of development, testing, business systems, and support teams.</p>
            <p>I have developed extensively in JavaScript and LAMP.</p>
            <p>I have built products using React, Angular, Bootstrap, Node, Wordpress, and d3.  I also have significant experience with Python and Salesforce.</p>
            <p>I have creative experience producing photography and video content.  My photography has been featured in The Stranger (Slog), Peabody Essex Musem, Parabola Magazine, and Seattle Times.</p>
            <p>I have pursued independent study in welding, fabrication, and CNC at South Seattle Community College.</p>
            <p>My primary isntrument is guitar and I produce music with Ableton.</p>
          </div>
        </div>
        <div className="col">
          <h2>Social Links</h2>
          <ul className="list-unstyled">
            {linkListItems}
          </ul>
          <h2>Colophon</h2>
          <p>This site was created with a text editor, React, Bootstrap, and hosted on Github.</p>
        </div>
      </div>
    </div>
  );
}


export default About;