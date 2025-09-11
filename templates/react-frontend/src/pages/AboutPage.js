import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <h1>About {{APP_TITLE}}</h1>
      
      <div className="content">
        <section>
          <h2>Built with Copilot Starter Kit</h2>
          <p>
            This React application was generated using the Copilot Starter Kit,
            a production-ready template system for rapid application development.
          </p>
        </section>

        <section>
          <h2>Technology Stack</h2>
          <ul>
            <li><strong>React 18</strong> - Modern UI library with hooks</li>
            <li><strong>React Router</strong> - Client-side routing</li>
            <li><strong>Axios</strong> - HTTP client for API calls</li>
            <li><strong>Jest & React Testing Library</strong> - Testing framework</li>
            <li><strong>CSS Modules</strong> - Scoped styling</li>
          </ul>
        </section>

        <section>
          <h2>Project Structure</h2>
          <div className="code-block">
            <pre>{`src/
├── components/         # Reusable UI components
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── services/          # API and external services
├── styles/            # Global styles and themes
├── utils/             # Helper functions
└── App.js             # Main application component`}</pre>
          </div>
        </section>

        <section>
          <h2>Getting Started</h2>
          <p>Ready to customize this application?</p>
          <ol>
            <li>Edit components in <code>src/components/</code></li>
            <li>Add new pages in <code>src/pages/</code></li>
            <li>Configure API endpoints in <code>src/services/api.js</code></li>
            <li>Update routing in <code>src/App.js</code></li>
            <li>Customize styles in <code>src/styles/</code></li>
          </ol>
        </section>

        <section>
          <h2>Learn More</h2>
          <p>
            Visit the{' '}
            <a 
              href="https://github.com/RippleJonathan/copilot-app-starter-kit" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Copilot Starter Kit repository
            </a>{' '}
            for documentation, examples, and more templates.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;