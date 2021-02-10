import React, { useState, useEffect } from 'react';
import { projectData } from './projectData';

export default function main() {
  return (
    <div className="project">
      {projectData.map((project, i) => (
        <div className="project-inner">
          <div className="project-container">
            <div className="project-description">
              <div className="project-desc-text">
                <p>{project.description}</p>
              </div>
            </div>
            <img className="project-image" src={project.image}></img>
          </div>
          <div className="project-control-panel">
            <p className="project-name">{project.name}</p>
            <div className="project-buttons">
              <button>Code</button>
              <button>Demo</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
