import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { technicalToolbeltData } from './technicalToolbeltData';

export default function main() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios.get('https://api.kanye.rest').then((res) => {
      setQuote(res.data.quote);
    });
  }, []);

  return (
    <div>
      <div className="stack-list">
        {technicalToolbeltData.map((category, i) => (
          <div className="stack-list-category">
            <h5>{category.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
