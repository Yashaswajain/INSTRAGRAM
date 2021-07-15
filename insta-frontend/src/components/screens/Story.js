import React from 'react'
import './Story.css'
import {Avatar} from '@material-ui/core'
function Story({src}) {
    return (
        <div className="story">
            <Avatar src={src} className="userStoryProfile"></Avatar>
        </div>
    )
}

export default Story
