import React from 'react';
import ReactDom from 'react-dom';
import './search.less'
import logo from './images/webpack-logo.png'
import '../../common'
class Search extends React.Component {  
  render () {
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