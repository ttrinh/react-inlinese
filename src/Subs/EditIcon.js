import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


// const Container = styled.span`

// `;

const EditIcon = ({ size = 24, color = '#555' }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <title>Pencil Icon</title>
        <path fill={color} d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828c0.375-0.375 1.031-0.375 1.406 0l2.344 2.344c0.375 0.375 0.375 1.031 0 1.406zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z" />
    </svg>
);

EditIcon.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
};

export default EditIcon;
