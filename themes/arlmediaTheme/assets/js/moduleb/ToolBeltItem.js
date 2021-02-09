import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

const ToolBeltItem = ({ name, category, icon }) => (
  <div className="stack-item">
    <div className="stack-item-icon" title={name}>
      <SVG src={icon} />
    </div>
    <p>{name}</p>
  </div>
);

export default ToolBeltItem;

ToolBeltItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
