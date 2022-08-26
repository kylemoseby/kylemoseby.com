import React, {
  useEffect,
  useState
}
from 'react';
import {
  // Link,
  useParams,
} from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import gistData from './gistData';




function Gist() {
  let params = useParams();

  const gistID = params.id;
  const [loaded, setLoaded] = useState(false)
  const [files, setFiles] = useState(null)

  const data = gistData.find(d => d.id === gistID)

  useEffect(() => {
    if (!loaded) {
      axios
        .get("https://api.github.com/gists/" + gistID)
        .catch((response) => {
          console.log("catch");
        })
        .then(response => {
          setLoaded(true);
          setFiles(response.data.files);
        });
    }
  });

  if (loaded) {
    let _files = Object.values(files);
    const gists = _files.map((gist, indx) => {
      return (
        <div className="row" key={indx}>
          <div className="col-3">
            <h2>{data.title}</h2>
            <div>{data.description()}</div>
          </div>
          <div className="col-9">
            <SyntaxHighlighter language={gist.language.toLowerCase()} style={docco}>
              {gist.content}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    });

    return (
      <div>
        {gists}
      </div>
    );
  }
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Gist;