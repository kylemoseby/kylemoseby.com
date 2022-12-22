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

function Photography() {
  return (
    <PageContainer pageName="Photography">
      <Outlet />
    </PageContainer>
  );
}

export default Photography;
