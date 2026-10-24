import { serializeError } from 'serialize-error';

export const getHTMLForErrorPage = (err: unknown): string => {
  const errorObj = serializeError(err);
  const message = errorObj?.message || 'An unexpected error occurred';
  const stack = errorObj?.stack || '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Server Error</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: #0f172a;
        color: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
      }
      .error-card {
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 12px;
        padding: 2rem;
        max-width: 640px;
        width: 100%;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      }
      h1 {
        font-size: 1.5rem;
        margin-top: 0;
        color: #f43f5e;
      }
      p {
        color: #94a3b8;
        line-height: 1.6;
      }
      pre {
        background: #0f172a;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        color: #e2e8f0;
        font-size: 0.875rem;
      }
      .btn {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1.25rem;
        background: #3b82f6;
        color: white;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="error-card">
      <h1>Application Error</h1>
      <p>${message}</p>
      ${stack ? `<pre>${stack}</pre>` : ''}
      <a href="/" class="btn">Return to Home</a>
    </div>
  </body>
</html>`;
};
