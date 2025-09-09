(function() {
  // Find the <script> that loaded this file
  const scriptTag = document.currentScript;

  // Read attributes
  const universityName = scriptTag.getAttribute("data-university-name") || "University Chatbot";
  const universityIcon = scriptTag.getAttribute("data-university-icon") || "💬";
  const assistantId = scriptTag.getAttribute("data-assistant-id") || "test-assistant";

  // Create floating button
  const button = document.createElement("div");
  button.innerHTML = `<img src="${universityIcon}" style="width:40px;height:40px;border-radius:50%;" alt="chat"/>`;
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.cursor = "pointer";
  button.style.zIndex = 9999;
  document.body.appendChild(button);

  // Create chat window (hidden at first)
  const chatWindow = document.createElement("div");
  chatWindow.style.position = "fixed";
  chatWindow.style.bottom = "80px";
  chatWindow.style.right = "20px";
  chatWindow.style.width = "300px";
  chatWindow.style.height = "400px";
  chatWindow.style.background = "#fff";
  chatWindow.style.border = "1px solid #ccc";
  chatWindow.style.borderRadius = "10px";
  chatWindow.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  chatWindow.style.display = "none";
  chatWindow.style.flexDirection = "column";
  chatWindow.style.overflow = "hidden";
  chatWindow.style.fontFamily = "Arial, sans-serif";
  chatWindow.style.zIndex = 9999;

  chatWindow.innerHTML = `
    <div style="background:#4a6cf7;color:white;padding:10px;font-weight:bold;">
      ${universityName}
      <span style="float:right;cursor:pointer;" id="closeChat">✖</span>
    </div>
    <div id="chatMessages" style="flex:1;padding:10px;overflow-y:auto;font-size:14px;">
      <div><b>Bot:</b> Hello! How can I help you today?</div>
    </div>
    <div style="padding:8px;border-top:1px solid #ccc;">
      <input id="chatInput" type="text" style="width:80%;padding:5px;" placeholder="Type a message..."/>
      <button id="sendChat" style="width:18%;padding:5px;">Send</button>
    </div>
  `;

  document.body.appendChild(chatWindow);

  // Toggle chat window
  button.onclick = () => {
    chatWindow.style.display = (chatWindow.style.display === "none") ? "flex" : "none";
  };

  // Close button
  chatWindow.querySelector("#closeChat").onclick = () => {
    chatWindow.style.display = "none";
  };

  // Handle sending messages
  const chatMessages = chatWindow.querySelector("#chatMessages");
  const chatInput = chatWindow.querySelector("#chatInput");
  const sendChat = chatWindow.querySelector("#sendChat");

  sendChat.onclick = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // Display user message
    const userMsg = document.createElement("div");
    userMsg.innerHTML = `<b>You:</b> ${text}`;
    chatMessages.appendChild(userMsg);

    chatInput.value = "";

    // For now just echo back
    const botMsg = document.createElement("div");
    botMsg.innerHTML = `<b>Bot:</b> You said "${text}" (assistantId=${assistantId})`;
    chatMessages.appendChild(botMsg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
})();
