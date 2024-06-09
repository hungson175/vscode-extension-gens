// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// const MODEL = "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF";
const MODEL = "TheBloke/Phind-CodeLlama-34B-v2-GGUF";
const http = require('http');
const SYSTEM_MESSAGE = 
"Act as a professional coder. " +
"Your response will be fed as API, so just give the codes,"+
" no commentary, nothing but codes - well, comments inside code is counted as codes but please dont use too many comments. "+
"But again, codes only - no comments are needed, not even ``` to mark code blocks";

function callLLM(model, systemMessage, userMessage, onDataReceived, onStreamEnd) {
    const timeoutDuration = 10000; // 10 seconds of inactivity
    let timeout = null;

    const data = JSON.stringify({
        model: model,
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: true
    });

    const options = {
        hostname: 'localhost',
        port: 1234,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let buffer = '';

        res.on('data', (chunk) => {
            // Reset the timeout whenever new data is received
			// console.log(chunk);
            clearTimeout(timeout);
            buffer += chunk.toString();
            console.log("BUFFER: ",buffer);
            let boundary = buffer.indexOf('\n');

            while (boundary !== -1) {
                let jsonString = buffer.substring(0, boundary).trim();                
                // remove "data:" from the beginning of the jsonString
                if (jsonString.startsWith("data:")) jsonString = jsonString.substring("data:".length).trim();
                
                
                buffer = buffer.substring(boundary + 1);
                if (isValidJson(jsonString)) processChunk(jsonString, onDataReceived);
                boundary = buffer.indexOf('\n');
            }

            // Set a new timeout
            timeout = setTimeout(() => {
                onStreamEnd();
                res.destroy(); // Optionally close the connection
            }, timeoutDuration);
        });

        res.on('end', () => {
            onStreamEnd(); // Handle end of stream
        });
    });

    req.on('error', (e) => {
        console.error('Error calling LLM:', e);
        onStreamEnd();
    });

    req.write(data);
    req.end();
}

function processChunk(json, onDataReceived) {
    try {
        const data = JSON.parse(json);
        if (data.choices && data.choices.length > 0) {
            const choice = data.choices[0];
            if (choice.delta && choice.delta.content) {
                const content = removeCodeQuote(choice.delta.content);
                
                onDataReceived(choice.delta.content);
            }
        }
    } catch (error) {
        console.error('Error processing chunk:', error);
    }
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('textCompletionExtension.insertText', function () {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const currentLine = document.lineAt(editor.selection.active.line).text;
			// console.log(currentLine);
			
            const userMessage = currentLine;            
            // insert a new line
            editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(document.lineCount, 0), '\n');
            });
            callLLM(MODEL, SYSTEM_MESSAGE, userMessage, (content) => {
                // This function is called whenever content is received                
                editor.edit(editBuilder => {
                    // Insert content at the end of the document
                    editBuilder.insert(new vscode.Position(document.lineCount + 1, 0), content);
                });
            }, () => {
                // This function is called when the stream ends or timeout occurs
                console.log('Stream ended or timed out');
            });
		}
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}




function isValidJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }    
}

function removeCodeQuote(content) {
    // remove ``` from the beginning and end of the content
    if (content.startsWith("```")) content = content.substring(3);
    if (content.endsWith("```")) content = content.substring(0, content.length - 3);
    return content;
}
// let provider = vscode.languages.registerCompletionItemProvider('plaintext', {
// 	provideCompletionItems(document, position) {
// 	  const linePrefix = document.lineAt(position).text.substring(0, position.character);
// 	  if (!linePrefix.endsWith("This is a text")) {
// 		return undefined;
// 	  }
  
// 	  return [
// 		new vscode.CompletionItem('Result(This is a text)', vscode.CompletionItemKind.Text)
// 	  ];
// 	}
//   }, { triggerCharacters: [' '] }); // Optionally set trigger characters if needed
  
//   context.subscriptions.push(provider);