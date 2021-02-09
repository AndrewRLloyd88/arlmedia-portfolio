import React from 'react';
import PropTypes from 'prop-types';

const ToolBeltItem = ({ name, category, icon }) => (
  <div className="stack-item">
    <div className="stack-item-icon" title={name}>
      <img className="stack-image" src={icon} />
    </div>
    <p className="stack-name">{name}</p>
  </div>
);

export default ToolBeltItem;

ToolBeltItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
