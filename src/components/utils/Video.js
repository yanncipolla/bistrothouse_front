import React from 'react';

function Video(props){

    return (
        <video
            width={props.width}
            height={props.height}
            poster={props.poster}
            preload='auto'
            controls
        >
            <source src={props.source} type={props.type}/>
            <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
            </p>
        </video>
    )
}

export default Video;