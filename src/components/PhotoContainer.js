import React from 'react';
import NoResults from './NoResults';
import Photo from './Photo';
import PropTypes from 'prop-types';

const PhotoContainer = (props) =>
{
    //if props photos array has photos display them, else display noResults component
    const contentToShow = props.photos.length > 0 ? 
        props.photos.map( photo => 
            <Photo link={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id}/> )
        : <NoResults />;
    ; 

    console.log('photo container re-rendered with', props.topic);

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {contentToShow}
            </ul>
        </div>
    )
};

PhotoContainer.propTypes = {
    photos: PropTypes.array.isRequired
}

export default PhotoContainer;