import React from 'react';
import ReactDom from 'react-dom';
import './search.css'
class Search extends React.Component {  
  render () { 
    return <div className="search-text">search text</div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)