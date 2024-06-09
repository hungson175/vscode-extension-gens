# Getting Started with LLM Models: A Practical Guide

## Goal of This Tutorial
This tutorial is designed to help you get started with Local Language Models (LLM), allowing you to make something useful while learning. You'll gain hands-on experience by building a VS Code extension that integrates with a local LLM server for dynamic code completion.

## Index
- [Getting Started with LLM Models: A Practical Guide](#getting-started-with-llm-models-a-practical-guide)
  - [Goal of This Tutorial](#goal-of-this-tutorial)
  - [Index](#index)
  - [What You Will Learn](#what-you-will-learn)
  - [Requirements](#requirements)
  - [Step 1: Setup and Explore LM Studio](#step-1-setup-and-explore-lm-studio)
    - [Exercises:](#exercises)
    - [Additional Tip:](#additional-tip)
    - [Some external resources:](#some-external-resources)
  - [Step 2: Write a Simple VS Code Extension](#step-2-write-a-simple-vs-code-extension)
  - [Step 3: Use LM Studio to Setup a Local LLM Server and Test with Postman](#step-3-use-lm-studio-to-setup-a-local-llm-server-and-test-with-postman)
  - [Step 4: Write a Very Simple Extension for VS Code to Test Simple Auto-complete](#step-4-write-a-very-simple-extension-for-vs-code-to-test-simple-auto-complete)
    - [Objective:](#objective)
    - [Access the Code:](#access-the-code)
    - [Guidance for Non-JS Programmers:](#guidance-for-non-js-programmers)
    - [Note:](#note)
  - [Step 5: Connect VS Code Extension to LLM Local Server for Code Completion](#step-5-connect-vs-code-extension-to-llm-local-server-for-code-completion)
    - [Objective:](#objective-1)
    - [Integration Process:](#integration-process)
    - [Result:](#result)
    - [Note:](#note-1)

## What You Will Learn
- How to build a local LLM model.
- Create an API server for an LLM model.
- Write basic extensions for Visual Studio Code.
- Have some fun by writing a small, helpful tool that will help you code faster and better in a surprisingly short amount of time!

## Requirements
- You are a coder who knows how to code in some programming language.
- Know the very basics of JavaScript (even if you're not fluent).
- Understand what LLMs are and how to use ChatGPT-like tools.
- The tutorial is designed for MacOS, but you can attempt it on other systems—good luck!


## Step 1: Setup and Explore LM Studio

Begin by downloading LM Studio, a versatile tool for interacting with language models. Follow these simple steps:

1. Visit the [LM Studio website](https://lmstudio.ai/) and download the application.
2. Open LM Studio. Upon launching, you'll see an intuitive interface designed for straightforward navigation.
3. Download a model by selecting one from the available options within the application.
4. To start chatting with the model, click on **AI Chat** located in the left panel. This will allow you to interact directly with the downloaded language model.

### Exercises:
- **Code Generation**: Ask the language model to write a simple program, such as generating a Fibonacci sequence. This exercise will help you understand how the model processes and executes programming tasks.
- **Code Only**: Challenge the model to write code without any comments. This will be particularly useful for later steps when you need to craft prompts that require concise code outputs.

### Additional Tip:
For enhanced performance, especially if you are working with larger models, enable GPU acceleration. This can be found under **Settings** > **GPU Acceleration** in the right panel. Enabling this feature will significantly speed up model responses.

### Some external resources:
[Review best LLMs for coding](https://github.com/continuedev/what-llm-to-use)

## Step 2: Write a Simple VS Code Extension

Create your first VS Code extension with a straightforward "Hello World" example. This step is designed to familiarize you with the basics of VS Code extension development.

1. **Begin with a Course**:
   - Start by following a free online course on Udemy that offers an introduction to creating VS Code extensions. You don't need to purchase the course; the free lessons should take about 20 minutes and will provide a solid foundation.
   - Course Link: [VS Code Extensions on Udemy](https://www.udemy.com/course/vscode-extensions/).

2. **Read the Official Guide**:
   - Next, review the official guide for writing your first VS Code extension. Pay particular attention to the setup and the structure of an extension project.
   - If the "Hello World" command does not show up in the debug window, check the `engines.vscode` section in your `package.json` file. Make sure the version specified is compatible with your installed version of VS Code.
   - Guide Link: [Your First Extension - VS Code API](https://code.visualstudio.com/api/get-started/your-first-extension).

## Step 3: Use LM Studio to Setup a Local LLM Server and Test with Postman

In this step, you'll learn how to set up a local LLM server using LM Studio and test its functionality using Postman. This process is crucial for understanding how to make API calls to your server.

1. **Install Postman**:
   - Download and install Postman from the [official website](https://www.postman.com/downloads/). This application will be used to interact with your local LLM server.

2. **Start the Local LLM Server**:
   - Open LM Studio and navigate to the **Local Server** option under the Home tab. Start the server as instructed. LM Studio provides an example that can serve as your initial test case.

3. **Testing with Postman**:
   - First, execute the example provided by LM Studio using a cURL command in your Terminal. This step helps you understand how the API call is structured.
   - Then, replicate this command in Postman. This will allow you to see how requests and responses are managed in a more graphical and user-friendly interface.

4. **Experiment with the Stream Parameter**:
   - Experiment with the `stream` parameter by setting it to `true` or `false`. This will help you observe how the API handles continuous versus single responses.
   - Note: For subsequent steps, particularly when integrating with the VS Code extension, you will find it easier to set `stream=false`.

5. **Use Custom Prompts**:
   - Use the custom prompts you developed in Step 1's exercises to test the API. This practice will help you understand how to customize API calls for specific tasks or queries.

This step is crucial for ensuring that your local server is operational and ready for more complex interactions in the following steps.

## Step 4: Write a Very Simple Extension for VS Code to Test Simple Auto-complete

The goal of this step is to create a simple VS Code extension that enhances your coding experience by automating a basic task. Here’s how to set it up:

### Objective:
- Develop a VS Code extension that allows you to write a line in the VS Code editor. When you press the shortcut (Cmd+Shift+;), the extension will automatically insert "Result(content of current line)" into the next line. This simulates a basic form of code completion.

### Access the Code:
- The code for this extension is housed in the GitHub repository where this README.md file is located. You can refer to this repository to view and use the actual implementation.

### Guidance for Non-JS Programmers:
- Not fluent in JavaScript? No problem! The tutorial includes step-by-step instructions to guide you through the process. Additionally, you can utilize the following resource to assist with coding the extension using ChatGPT4:
  - [Using ChatGPT4 for Coding VS Code Auto-complete Extension](https://chatgpt.com/share/06f232cd-ed2f-46b4-9ecb-da0915bc2e40)

### Note:
- This tutorial is a work in progress and will be updated with more detailed instructions and additional features to further enhance the functionality of the extension. Tell me if you need it :)

## Step 5: Connect VS Code Extension to LLM Local Server for Code Completion

This final step combines the components from Steps 3 and 4 to create a dynamic coding assistant within VS Code. Here's how to set it up:

### Objective:
- Enhance the VS Code extension developed earlier so that it can interpret and execute coding prompts dynamically. For example, when you type "write Fibonacci function" and use the designated shortcut, the extension will communicate with the local LLM server to fetch the corresponding code.

### Integration Process:
1. **Capture User Input**:
   - Modify the extension to capture a line of text as a prompt when the designated shortcut (Cmd+Shift+;) is pressed.

2. **API Call to Local LLM Server**:
   - Instead of merely displaying the typed text, the extension will send this text as a prompt to the local LLM server set up in Step 3.

3. **Retrieve and Display Code**:
   - The local LLM server processes the prompt and returns the generated code. The extension then inserts this code directly into the editor, below the line where the prompt was typed.

### Result:
  You now have a VS Code extension that acts as an intelligent code generator, capable of creating code snippets based on simple textual prompts. This tool enhances productivity by integrating advanced AI capabilities directly into your development environment.
### Note: 
I'm using the Phind-CodeLlama 34B model, which is quantized to 4 bits. This setup consumes about 17GB of RAM, plus an additional 8GB for macOS operations. Therefore, it's necessary to have a Mac with at least 32GB of RAM to run this model effectively.


