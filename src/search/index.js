import React from 'react';
import ReactDom from 'react-dom';
import './search.less'
import logo from './images/webpack-logo.png'
class Search extends React.Component {  
  render () {
    a = 1
      
    return <div className="search-text">
      search text
              <img src={logo}/>
            </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)