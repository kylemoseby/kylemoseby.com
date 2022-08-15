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
        <div className="col-auto col-lg-9">
          <h2>About</h2>
          <div className="">
            <p>I am a tecnhincal and creative consultant with over 20 years experience putting content on the Internet.</p>
            <p>I have worked on teams for big corporations (Microsoft, DR Horton), agencies (POP), nonprofits, and startups (Tableau).</p>
            <p>I have been apart of development, testing, business systems, and support teams.</p>
            <p>I have developed extensively in JavaScript and LAMP.</p>
            <p>I have built products using React, Angular, Bootstrap, Node, Wordpress, and d3.  I also have significant experience with Python and Salesforce.</p>
            <p>34K people installed themes that I had developed on Tumblr.</p>
            <p>I have creative experience producing photography and video content for bands, entertainers, and nonprofits.  My photography has been featured on Slog, Peabody Essex Musem, Parabola Magazine, Seattle Times.</p>
            <p>I have pursued independent study in welding, fabrication, and CNC at South Seattle Community College.</p>
            <p>My primary isntrument is guitar and I produce music with Ableton</p>
          </div>
        </div>
        <div className="col col-lg-3">
          <h2>Social Links</h2>
          <ul className="list-unstyled">
            {linkListItems}
          </ul>
          <h2>Colophon</h2>
          <p>This site was created with a text editor, React, and hosted on Github.</p>
        </div>
      </div>
    </div>
  );
}


export default About;