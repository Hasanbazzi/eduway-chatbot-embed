<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Chatbot with Gradient Header</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            width: 100%;
            text-align: center;
        }
        
        h1 {
            color: #2d3748;
            margin-bottom: 30px;
            font-size: 2.5rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
        }
        
        .description {
            color: #4a5568;
            font-size: 1.1rem;
            max-width: 800px;
            margin: 0 auto 40px;
            line-height: 1.6;
        }
        
        .chatbot-container {
            position: relative;
            width: 360px;
            height: 500px;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        
        .chatbot-container:hover {
            transform: translateY(-5px);
        }
        
        .chat-header {
            background: linear-gradient(to right, #4C9AE3, #8462F1);
            color: white;
            padding: 14px 16px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
        }
        
        .chat-messages {
            flex: 1;
            padding: 12px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #f8f9fa;
            height: calc(100% - 120px);
        }
        
        .message {
            padding: 10px 14px;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            animation: fadeIn 0.3s ease;
        }
        
        .bot-message {
            align-self: flex-start;
            background: #f1f3f5;
            border-radius: 12px 12px 12px 0px;
        }
        
        .user-message {
            align-self: flex-end;
            background: #DCF8C6;
            border-radius: 12px 12px 0px 12px;
        }
        
        .chat-input-container {
            padding: 12px;
            border-top: 1px solid #ddd;
            display: flex;
            gap: 6px;
            background: white;
            height: 60px;
        }
        
        #chatInput {
            flex: 1;
            padding: 10px 15px;
            border-radius: 20px;
            border: 1px solid #ddd;
            outline: none;
            font-size: 14px;
            transition: border 0.2s;
        }
        
        #chatInput:focus {
            border-color: #8462F1;
        }
        
        #sendChat {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(to right, #4C9AE3, #8462F1);
            color: white;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        
        #sendChat:hover {
            transform: scale(1.05);
        }
        
        .floating-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(to right, #4C9AE3, #8462F1);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 1000;
        }
        
        .floating-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        }
        
        .code-container {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 10px;
            margin-top: 40px;
            text-align: left;
            max-width: 800px;
            overflow-x: auto;
        }
        
        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .code-title {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .copy-btn {
            background: #4C9AE3;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .copy-btn:hover {
            background: #3a7bc8;
        }
        
        pre {
            white-space: pre-wrap;
            line-height: 1.5;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 600px) {
            .chatbot-container {
                width: 100%;
                height: 400px;
            }
            
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>University Chatbot</h1>
        <p class="description">This chatbot features a gradient header similar to your Flutter implementation. The gradient uses the same blue-to-purple colors from your code: #4C9AE3 to #8462F1.</p>
        
        <div class="chatbot-container">
            <div class="chat-header">
                <span>University Assistant</span>
                <span>✖</span>
            </div>
            <div class="chat-messages">
                <div class="message bot-message">
                    <b>Bot:</b> Hello! How can I help you today?
                </div>
                <div class="message user-message">
                    <b>You:</b> I have a question about enrollment.
                </div>
                <div class="message bot-message">
                    <b>Bot:</b> Sure, I'd be happy to help with enrollment questions. What would you like to know?
                </div>
            </div>
            <div class="chat-input-container">
                <input id="chatInput" type="text" placeholder="Type a message...">
                <button id="sendChat">➤</button>
            </div>
        </div>
        
        <div class="code-container">
            <div class="code-header">
                <div class="code-title">CSS Gradient Code</div>
                <button class="copy-btn">Copy Code</button>
            </div>
            <pre>background: linear-gradient(to right, #4C9AE3, #8462F1);</pre>
        </div>
    </div>
    
    <div class="floating-btn">
        <span style="font-size:28px;">🤖</span>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const chatMessages = document.querySelector('.chat-messages');
            const chatInput = document.getElementById('chatInput');
            const sendChat = document.getElementById('sendChat');
            const copyBtn = document.querySelector('.copy-btn');
            
            // Function to add a message to the chat
            function addMessage(text, isUser) {
                const message = document.createElement('div');
                message.classList.add('message');
                message.classList.add(isUser ? 'user-message' : 'bot-message');
                message.innerHTML = `<b>${isUser ? 'You:' : 'Bot:'}</b> ${text}`;
                chatMessages.appendChild(message);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // If it's a user message, simulate a bot response after a delay
                if (isUser) {
                    setTimeout(() => {
                        addMessage("I'm here to help with any questions about the university. What would you like to know?", false);
                    }, 1000);
                }
            }
            
            // Send message when button is clicked
            sendChat.addEventListener('click', function() {
                const text = chatInput.value.trim();
                if (text) {
                    addMessage(text, true);
                    chatInput.value = '';
                }
            });
            
            // Send message when Enter key is pressed
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    sendChat.click();
                }
            });
            
            // Copy code functionality
            copyBtn.addEventListener('click', function() {
                const code = 'background: linear-gradient(to right, #4C9AE3, #8462F1);';
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy Code';
                    }, 2000);
                });
            });
        });
    </script>
</body>
</html>
