import React from 'react';
import { changeTitle } from '../../helpers/modifyHtmlHead';

const NotFound = () => {
  changeTitle('Error 404');
  return (
    <>
      <h1>Error 404</h1>
      <h3>Page not found</h3>
    </>
  );
};

export default NotFound;
