import React from 'react';
import NoResults from './NoResults';
import Photo from './Photo';
import PropTypes from 'prop-types';

const PhotoContainer = ( props ) =>
{
    let contentToShow;

    // display loading if loadingFinished false
    if(!props.loadingFinished) {
        contentToShow = <h2>Loading photos ...</h2>;
    }
    else if(props.loadingFinished) {
        // display not found if loadingFinished true and no results
        if(props.photos.length === 0) {
            contentToShow = <NoResults />;
        }
        // display photos if loadingFinished and there are results
        else if(props.photos.length > 0) {
            contentToShow = 
            <>
                <h2>{props.topic} Gifs</h2>
                <ul>
                    { props.photos.map( photo => 
                        <Photo link={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id}/> ) 
                    }
                </ul>
            </>;
        }
    }

    return (
        <div className="photo-container">
            {contentToShow}
        </div>  
    ) 
};

PhotoContainer.propTypes = {
    photos: PropTypes.array.isRequired,
    loadingFinished: PropTypes.bool.isRequired,
    topic: PropTypes.string.isRequired
}

export default PhotoContainer;