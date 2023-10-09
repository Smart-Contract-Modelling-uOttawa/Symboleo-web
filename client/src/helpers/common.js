/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { languages, editor as Editor} from 'monaco-editor';
import { createConfiguredEditor} from 'vscode/monaco';
import 'vscode/default-extensions/theme-defaults';
import 'vscode/default-extensions/json';
import { initServices, MonacoLanguageClient } from 'monaco-languageclient';
import { CloseAction, ErrorAction } from 'vscode-languageclient';
import { WebSocketMessageReader, WebSocketMessageWriter, toSocket } from 'vscode-ws-jsonrpc';
import { symboleoLanguage } from './languageSyntax';
import {meatSaleContract} from './defaultCode';

const LANGUAGE_ID = 'symboleo'

const handleDiagnosticsMiddleware = (uri, diagnostics, next) => {
    console.log(uri, diagnostics);
    const uriString = uri.toString();
    if (diagnostics && diagnostics.length === 0){
        // Clear existing markers for the URI
        Editor.setModelMarkers(Editor.getModel(uriString), LANGUAGE_ID, []);
    }
    // Check if there are diagnostics for the given URI
    if (diagnostics && diagnostics.length > 0) {
        // Clear existing markers for the URI
        Editor.setModelMarkers(Editor.getModel(uriString), LANGUAGE_ID, []);
    
        const markers = diagnostics.map((diagnostic) => {
            return {
              severity: diagnostic.severity,
              message: diagnostic.message,
              startLineNumber: diagnostic.range._start._line+1,
              startColumn: diagnostic.range._start._character+1,
              endLineNumber: diagnostic.range._end._line+1,
              endColumn: diagnostic.range._end._character+1,
            };
        });

        console.log(markers);
    
        // Update markers in the Monaco Editor
        Editor.setModelMarkers(Editor.getModel(uriString), LANGUAGE_ID, markers);

    }
  };

export const createLanguageClient = (transports, workspaceUrl) => {
    return new MonacoLanguageClient({
        name: 'Symboleo Language Client',
        clientOptions: {
            // use a language id as a document selector
            documentSelector: [{ scheme: 'inmemory', language: LANGUAGE_ID }],
            // disable the default error handler
            middleware: {
                // Register the handleDiagnostics middleware
                handleDiagnostics: handleDiagnosticsMiddleware,
            },
            errorHandler: {
                error: () => ({ action: ErrorAction.Continue }),
                closed: () => ({ action: CloseAction.DoNotRestart })
            },
            // workspaceFolder: {
            //     uri:  workspaceUrl,
            //     name: ''
            // }
        },
        // create a language client connection from the JSON RPC connection on demand
        connectionProvider: {
            get: () => {
                return Promise.resolve(transports);
            }
        }
    });
};

export const createUrl = (hostname, port, path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${protocol}://${hostname}:${port}${path}`;
};

export const createWebSocketAndStartClient = (url, workspaceUrl) => {
    const webSocket = new WebSocket(url);
    const socket = toSocket(webSocket);
    webSocket.onopen = (connection) => {
        const reader = new WebSocketMessageReader(socket);
        const writer = new WebSocketMessageWriter(socket);
        const languageClient = createLanguageClient({
            writer,
            reader
        }, workspaceUrl);
        languageClient.start();
        reader.onClose(() => languageClient.stop());
    };
    return webSocket;
};

export const createDefaultJsonContent = () => {
    return meatSaleContract;
};

export const performInit = async (vscodeApiInit) => {
    if (vscodeApiInit === true) {
        await initServices({
            enableThemeService: false,
            enableTextmateService: false,
            enableModelService: true,
            configureEditorOrViewsService: {
            },
            enableKeybindingsService: false,
            enableLanguagesService: true,
            enableOutputService: true,
            enableAccessibilityService: true,
            debugLogging: true
        });

        // register the JSON language with Monaco
        languages.register({
            id: LANGUAGE_ID,
            extensions: [`.${LANGUAGE_ID}`],
            aliases: [LANGUAGE_ID],
            mimetypes: [`application/${LANGUAGE_ID}`]
        });

        languages.setLanguageConfiguration(LANGUAGE_ID, {
            comments: {
                lineComment: "//",
                blockComment: ['/*', '*/']
            },
            brackets: [['{', '}'], ['[', ']']],
            autoClosingPairs: [
                {
                    open: '{',
                    close: '}'
                },
                {
                    open: '[',
                    close: ']'
                }]
        });

        languages.setMonarchTokensProvider(LANGUAGE_ID, symboleoLanguage)
    }
};

export const createEditor = async (config, workspaceUrl) => {
    // create the model
    // const uri =  Uri.parse(`C:/symboleo-test`);
    const modelRef = Editor.createModel(config.content, LANGUAGE_ID, workspaceUrl)
    const editor = createConfiguredEditor(config.htmlElement, {
        model: modelRef,
        glyphMargin: true,
        lightbulb: {
            enabled: true
        },
        //theme: 'vs-dark',
        automaticLayout: true,
        'semanticHighlighting.enabled': true
    });

    editor.onDidChangeModelContent = () => {
        
    }
    
    const result = {
        editor,
        workspaceUrl,
        modelRef
    };
    return Promise.resolve(result);
};