import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { technicalToolbeltData } from './technicalToolbeltData';
import ToolBeltItem from './ToolBeltItem';

export default function main() {
  return (
    <div>
      <div className="stack-list">
        {technicalToolbeltData.map((category, i) => (
          <div className="stack-list-category">
            <h5>{category.name}</h5>
            <div className="stack-list-category-items">
              {category.icons.map((item, i) => (
                <ToolBeltItem key={i} name={item.name} icon={item.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="motto">And adding more to the toolbelt every day...</p>
    </div>
  );
}
