/*
 * Styleguidist hack
 * Make sure the demo codes' iframe stay within the code window
 */
import React from 'react';

export default ({ children }) => (
    <div style={{ width: '100%', overflow: 'auto'}}>
        {children}
    </div>
);
