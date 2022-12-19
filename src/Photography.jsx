import React from 'react';
import {
  Outlet,
} from "react-router-dom";
// import {
//   ImGithub,
//   ImCodepen,
//   ImEnlarge2,
//   ImShrink2,
// ImBehance,
// } from "react-icons/im"
import PageContainer from './PageContainer';
import PhotographyData from './PhotographyData';
import './App.scss';

// Common wrapper for Codepen and Gist Examples

function Photography() {
  console.log(PhotographyData);
  return (
    <PageContainer pageName="Photography">
      <Outlet />
    </PageContainer>
  );
}

export default Photography;
