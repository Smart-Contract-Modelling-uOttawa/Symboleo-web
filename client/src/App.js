/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createEditor, createUrl, createWebSocketAndStartClient, performInit } from './helpers/common';
import { Uri} from 'monaco-editor';
import React, { createRef, useEffect, useMemo, useRef , useState} from 'react';
import { buildWorkerDefinition } from "monaco-editor-workers";
import { meatSaleContract } from './helpers/defaultCode';

buildWorkerDefinition('./node_modules/monaco-editor-workers/dist/workers', import.meta.url, false);

let init = true

export const ReactMonacoEditor = ({
    defaultCode,
    hostname,
    path,
    port,
    className
}) => {
    const modelUri = `inmemory:/24.symboleo`;
    const [windowContent, setWindowContent] = useState(meatSaleContract);
    // const [windowContent, setWindowContent] = useState(``);
    const editorRef = useRef();
    const ref = createRef();
    const url = useMemo(() => createUrl(hostname, port, path), [hostname, port, path]);

    // const [workspaceUrl, setWorkspaceUrl] = useState(Uri.parse('file://C:/'));
    const [workspaceUrl, setWorkspaceUrl] = useState(Uri.parse(modelUri));

    useEffect(() => {
        const currentEditor = editorRef.current;
        let lspWebSocket;
        console.log(workspaceUrl);
        if (ref.current != null && workspaceUrl !== '') {
            const start = async () => {
                await performInit(true);
                await createEditor({
                    htmlElement: ref.current,
                    content: windowContent
                }, workspaceUrl);
                if (init) {
                    init = false;
                }
                lspWebSocket = createWebSocketAndStartClient(url, workspaceUrl);
            };
            start();

            return () => {
                currentEditor?.dispose();
            };
        }

        window.onbeforeunload = () => {
            // On page reload/exit, close web socket connection
            lspWebSocket?.close();
        };
        return () => {
            // On component unmount, close web socket connection
            lspWebSocket?.close();
        };
    }, [workspaceUrl, windowContent]);
        // Fallback to another file access method

    return (
        <div
            ref={ref}
            style={{ height: '90vh' }}
            className={className}
        />
    );
    
};