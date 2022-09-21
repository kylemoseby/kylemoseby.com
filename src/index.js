import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Introduction from './Introduction';
import Code from './Code';
import About from './About';
import Links from './Links';
import CodePen from './CodePen';
import CodeIntro from './CodeIntro';
import Gist from './Gist';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Introduction />} />
          <Route path="code" element={<Code />}>
            <Route index element={<CodeIntro />} />
            <Route path="pen/:slugHash" element={<CodePen />} />
            <Route path="gist/:id" element={<Gist />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="links" element={<Links />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

/*
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
*/