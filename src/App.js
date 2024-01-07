import React, { useState } from 'react';
import './styles/App.css';
import MandalaMirror from './mandala-mirror/MandalaMirror.jsx';

// To add new app
// 1. JUST add to components. Everything else is automatic
const components = [
  MandalaMirror
];

// Ignore after this

// Converts React1ContactForm to {name:React1ContactForm.name, component: React1ContactForm }
const AppNames = components.map(component => ({
  name: component.displayName || component.name,
  component
}));

function App() {
  const [selectedApp, setSelectedApp] = useState(null);

  const content = selectedApp ? (
    <>
      <div id="canvas-container"></div> {/* Canvas will be injected here */}
      <selectedApp.component />
    </>
  ) : <h1>Select an App to Display</h1>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>FuncTo Drawings</h1>
        <div>
          {AppNames.map((app, i) => (
            <button key={`button-${i}`} onClick={() => setSelectedApp(app)}>
              {app.name}
            </button>
          ))}
        </div>
      </header>

      <div className="app-content">
        {content}
      </div>

      <footer className="App-footer">
        <p>With ❤️ Sagar & Rohit</p>
      </footer>
    </div>
  );
}

export default App;

