import React from 'react';
import  './index.less';
const Loading =  ({text = '加载中...'}) => {
  return (
    <div className={`loading-wrap`}>
      <div className={`loading3`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Loading
