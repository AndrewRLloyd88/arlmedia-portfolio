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
                <p className="desc">{project.description}</p>
                {project.frontend && (
                  <p className="stack-type">
                    <span className="stack-type-title">Frontend:</span>
                    <div className="stack-row">
                      {project.frontend.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.frontendNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.backend && (
                  <p className="stack-type">
                    <span className="stack-type-title">Backend:</span>
                    <div className="stack-row">
                      {project.backend.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.backendNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.test && (
                  <p className="stack-type">
                    <span className="stack-type-title">Test:</span>
                    <div className="stack-row">
                      {project.test.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.testNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.deployment && (
                  <p className="stack-type">
                    <span className="stack-type-title">Deployment:</span>
                    <div className="stack-row">
                      {project.deployment.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.deploymentNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
              </div>
            </div>
            <img className="project-image" src={project.image}></img>
          </div>
          <div className="project-control-panel">
            <p className="project-name">{project.name}</p>
            <div className="project-buttons">
              {project.github !== '' && (
                <button
                  onClick={() => {
                    window.location.href = `${project.github}`;
                  }}
                >
                  Code
                </button>
              )}
              {project.demo !== '' && (
                <button
                  onClick={() => {
                    window.location.href = `${project.demo}`;
                  }}
                >
                  Demo
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
