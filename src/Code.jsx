import React from 'react';
import {
  Outlet
} from "react-router-dom";
import PageContainer from './PageContainer';
import './App.scss';


function Code() {

  return (
    <PageContainer pageName="Code">
      <Outlet />
    </PageContainer>
  );
}

export default Code;