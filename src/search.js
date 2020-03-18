'use strict';

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'

class Search extends React.Component {
    render() {
        return <div className='searchText'>搜索文字</div>;
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)