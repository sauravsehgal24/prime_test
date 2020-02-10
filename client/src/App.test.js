import React from 'react';
import ReactDom from 'react-dom';
import {cleanup } from "@testing-library/react";
import App from './App';

afterEach(cleanup);

describe('App Component', ()=> {
  it("should render successfully", ()=>{
    const div = document.createElement('div');
    ReactDom.render(<App></App>,div)
    ReactDom.unmountComponentAtNode(div) 
  });
});
