import React from 'react';
import Header from '../components/Header';

export default ( props ) => {
    return (
        <div className="container">
          <Header />
          { props.children }
        </div>
    );
};
