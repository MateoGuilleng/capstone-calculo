'use client';
import { useEffect } from 'react';

export default function MathJaxWrapper({ children }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'mathjax-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById('mathjax-script');
      if (oldScript) document.head.removeChild(oldScript);
    };
  }, []);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  });

  return <div>{children}</div>;
}
