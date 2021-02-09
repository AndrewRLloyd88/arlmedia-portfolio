import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function main() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios.get('https://api.kanye.rest').then((res) => {
      setQuote(res.data.quote);
    });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <p>{quote}</p>
      <h4>TODAY</h4>
    </div>
  );
}
