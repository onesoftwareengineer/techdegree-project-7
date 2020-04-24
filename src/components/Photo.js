import React from 'react';
import PropTypes from 'prop-types';

const Photo = (props) =>
    <li>
        <img src={props.link} alt="" />
    </li>
;

Photo.propTypes = {
    link: PropTypes.string.isRequired
}

export default Photo;