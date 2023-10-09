import './index.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactMonacoEditor } from './App.js';
import './helpers/ide.css';

const defaultCode = ``;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Fragment>
<h2>Symboleo Web</h2>
<a href='https://github.com/Smart-Contract-Modelling-uOttawa/Symboleo-IDE/tree/master'>Documentation</a>
<ReactMonacoEditor
    defaultCode={defaultCode}
    hostname={'localhost'}
    path={'/'}
    port={5007} />
    
    </Fragment>);