'use strict';

import React from 'react'
import ReactDom from 'react-dom'
import '../../common'
import { a } from './tree-shaking';
import './search.less'

if(0) a()
class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        }
    }
    handleClick() {
        import('./test').then((Text) => {
            this.setState({
                Text : Text.default
            })
        })
    }

    render() {

        const funcA = a()
        const { Text } = this.state
        return <div className='searchText'>
                {
                    Text ? <Text /> : null
                }
                {funcA}搜索文字 见证多页面打包 我是第二个页面search
                <button onClick={this.handleClick.bind(this)}>点击 动态import</button>
            </div>;
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)