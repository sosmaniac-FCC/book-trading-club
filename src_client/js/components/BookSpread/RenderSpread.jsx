import React from 'react';

import { v4 } from 'uuid';

import RenderFloat from './RenderFloat.jsx';
import RenderBody from './RenderBody.jsx';

const RenderSpread = (props) => (
    <div>
    {
        props.items.map((item) => (
            <div id={item.bookId} key={v4()} 
                onMouseOver={props.handleMouseOver} 
                onMouseMove={props.handleMouseMove}
                onMouseOut={props.handleMouseOut}>
                
                <RenderBody username={props.username} 
                    bookImgUrl={item.bookImgUrl} 
                    bookTitle={item.bookTitle} 
                    bookOwnerId={item.bookOwnerId}/>
                    
                <RenderFloat username={props.username} 
                    bookTitle={item.bookTitle} 
                    bookOwnerId={item.bookOwnerId}/>
            </div>
        ))
    }
    </div>
);

export default RenderSpread;

// item.bookTitle, item.bookOwnerId, props.username