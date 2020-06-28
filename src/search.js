import React from 'react';
import ReactDom from 'react-dom';

class Search extends React.Component {  
  render () { 
    return <div>search text</div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)