import React from 'react';
import {
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import './App.scss';
import pages from './pages';


function Header() {
  let location = useLocation();
  let currentPath = location.pathname;
  function Menu() {
    return (
      <ul className="menu d-inline-block fw-bold text-uppercase m-0 display-6">
        {pages.map((_l, indx) => {
          return (
            <li className="d-inline-block px-3" key={indx}>
              <Link
                className={currentPath.indexOf(_l.path) === -1 ? 'text-decoration-none' : ' text-decoration-line-through'}
                aria-current="page"
                to={_l.path}>
                  {_l.title}
                </Link>
            </li>
          )
        })}
      </ul>
    );
  }

  return (
    <header>
      <div className={'header ' + (currentPath === '/' ? 'd-none' : '')}>
        <div className="accent-font display-6 d-inline-block p-3">
          <Link to="/" className="text-decoration-none">Kyle Moseby</Link>
        </div>
        <Menu />
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;