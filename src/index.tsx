import { Hono } from 'hono'

const app = new Hono()

const JumpPage = () => {
  const quickLinks = [
    { name: 'Google', url: 'https://google.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'Local 3000 Port', url: 'http://192.168.0.121:3000' },
  ];

  return (
    <html>
      <head>
        <title>Jump to Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f0f0f0;
              padding: 20px;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
              width: 100%;
              max-width: 400px;
              box-sizing: border-box;
            }
            input {
              width: 100%;
              padding: 10px;
              margin: 10px 0;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 16px;
              box-sizing: border-box;
            }
            button {
              width: 100%;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
              box-sizing: border-box;
            }
            button:hover {
              background-color: #0056b3;
            }
            h1 {
              margin-top: 0;
              color: #333;
              font-size: 1.5rem;
            }
            .quick-links {
              margin-top: 1.5rem;
              text-align: left;
            }
            .quick-links h3 {
              margin: 0 0 0.5rem 0;
              color: #666;
              font-size: 0.9rem;
              text-align: center;
            }
            .link-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .link-item {
              margin: 0.5rem 0;
            }
            .link-item a {
              display: block;
              padding: 8px 12px;
              background-color: #f8f9fa;
              color: #007bff;
              text-decoration: none;
              border-radius: 4px;
              font-size: 14px;
              transition: background-color 0.2s;
            }
            .link-item a:hover {
              background-color: #e9ecef;
              color: #0056b3;
            }

            /* Mobile responsive styles */
            @media (max-width: 480px) {
              body {
                padding: 10px;
              }
              .container {
                padding: 1.5rem;
                border-radius: 6px;
              }
              h1 {
                font-size: 1.25rem;
                margin-bottom: 1rem;
              }
              input {
                font-size: 14px;
                padding: 8px;
              }
              button {
                font-size: 14px;
                padding: 8px 16px;
              }
              .quick-links {
                margin-top: 1rem;
              }
              .link-item a {
                font-size: 13px;
                padding: 6px 10px;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Jump to Website</h1>
          <input
            type="text"
            id="urlInput"
            placeholder="Enter website URL (e.g., https://example.com)"
          />
          <br />
          <button onclick="jumpToWebsite()">Go</button>

          <div class="quick-links">
            <h3>Quick Links</h3>
            <ul class="link-list">
              {quickLinks.map((link, index) => (
                <li key={index} class="link-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <script>
          {`
            function jumpToWebsite() {
              const url = document.getElementById('urlInput').value;
              if (url) {
                // Add https:// if not present
                let formattedUrl = url;
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                  formattedUrl = 'https://' + url;
                }
                window.location.href = formattedUrl;
              } else {
                alert('Please enter a URL');
              }
            }

            // Allow Enter key to trigger the jump
            document.getElementById('urlInput').addEventListener('keypress', function(event) {
              if (event.key === 'Enter') {
                jumpToWebsite();
              }
            });
          `}
        </script>
      </body>
    </html>
  )
}

app.get('/', (c) => {
  return c.html(<JumpPage />)
})

import { serve } from '@hono/node-server'

const hostname = '192.168.0.121'
const port = 3021

console.log(`Server running at http://${hostname}:${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname,
})
