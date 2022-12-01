import React from 'react';
import ReactMarkdown from 'react-markdown';

function ListItemHorizontal(props) {
    const { item } = props;
    const [ name = null, exp = 0 ] = [Object.keys(item)[0], Object.values(item)[0]];
    const lvl = [];

    for ( let i = 0; i < exp; i++ ) {
        lvl.push(<span key={i} style={{backgroudColor: "green !importan", width: "max-content", margin: 0}}>-</span>)
    }
    return (
        <li>
            <div className='list-hor-name-item'>
                <ReactMarkdown components={{p: React.Fragment}}>
                    {name}
                </ReactMarkdown>
            </div>
            {lvl}
        </li>
    );
}

export default ListItemHorizontal;