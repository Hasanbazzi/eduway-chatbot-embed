(function() {
  const scriptTag = document.currentScript;
  const universityName = scriptTag.getAttribute("data-university-name") || "University Chatbot";
  const universityIcon = scriptTag.getAttribute("data-university-icon") || "🤖";
  const assistantId = scriptTag.getAttribute("data-assistant-id") || "test-assistant";

const button = document.createElement("div");
const botIcon = universityIcon || "🤖";

// Check if botIcon looks like a URL
if (botIcon.startsWith("http://") || botIcon.startsWith("https://")) {
    const img = document.createElement("img");
    img.src = botIcon;
    img.style.width = "32px"; // adjust size
    img.style.height = "32px";
    img.style.borderRadius = "50%";
    button.appendChild(img);
} else {
    // emoji or text
    button.innerHTML = `<span style="font-size:28px;">${botIcon}</span>`;
}

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(to right, rgb(76,154,227), rgb(132,98,241))",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
    zIndex: 9999
  });

  button.onmouseenter = () => {
    button.style.transform = "scale(1.1)";
    button.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
  };
  button.onmouseleave = () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  };
  document.body.appendChild(button);

  const chatWindow = document.createElement("div");
  Object.assign(chatWindow.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "360px",
    height: "500px",
    background: "#ffffff",// purple with opacity
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    zIndex: 9999
  });

 chatWindow.innerHTML = `
  <div style="background:linear-gradient(to right, rgb(76,154,227), rgb(132,98,241));color:white;padding:14px 16px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;">
    <span>${universityName}</span>
    <span id="closeChat" style="cursor:pointer;font-weight:bold;font-size:18px;">✖</span>
  </div>
  <div id="chatMessages" style="flex:1;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;">
    <div style="align-self:flex-start;background:#E9E4FE;padding:10px 14px;border-radius:12px 12px 12px 0px;max-width:80%;word-wrap:break-word;transition: all 0.3s;">
      Hello! How can I help you today?
    </div>
  </div>
  <div style="padding:12px;border-top:1px solid #ddd;display:flex;gap:6px;">
    <input id="chatInput" type="text" placeholder="Type a message..." style="flex:1;padding:10px;border-radius:20px;border:1px solid #ccc;outline:none;font-size:14px;transition: border 0.2s;"/>
    <button id="sendChat" style="width:48px;height:48px;border-radius:50%;
      background:linear-gradient(to right, rgb(76,154,227), rgb(132,98,241));
      color:white;border:none;display:flex;justify-content:center;align-items:center;
      cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.2);transition: transform 0.2s;">
      &#10148;
    </button>
  </div>
`;

  document.body.appendChild(chatWindow);

  button.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
  };
  chatWindow.querySelector("#closeChat").onclick = () => chatWindow.style.display = "none";

  const chatMessages = chatWindow.querySelector("#chatMessages");
  const chatInput = chatWindow.querySelector("#chatInput");
  const sendChat = chatWindow.querySelector("#sendChat");

  async function sendMessage(text) {
    if (!text) return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.style.alignSelf = "flex-end";
    userMsg.style.background = "#CBE3FF";
    userMsg.style.padding = "10px 14px";
    userMsg.style.borderRadius = "12px 12px 0px 12px";
    userMsg.style.maxWidth = "80%";
    userMsg.style.wordWrap = "break-word";
    userMsg.innerHTML = `${text}`;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing indicator
    const typing = document.createElement("div");
    typing.style.alignSelf = "flex-start";
    typing.style.background = "#E9E4FE"
    typing.style.padding = "10px 14px";
    typing.style.borderRadius = "12px 12px 12px 0px";
    typing.style.maxWidth = "80%";
    typing.style.wordWrap = "break-word";
    typing.style.fontStyle = "italic";
    typing.style.opacity = "0.8";
    typing.innerHTML = `typing...`;
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch("https://eduway-chatbot-backend-1.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          assistantId: assistantId,
          message: text
        })
      });

      const data = await res.json();
      typing.remove();

      const botMsg = document.createElement("div");
      botMsg.style.alignSelf = "flex-start";
      botMsg.style.background = "#E9E4FE"; 
      botMsg.style.padding = "10px 14px";
      botMsg.style.borderRadius = "12px 12px 12px 0px";
      botMsg.style.maxWidth = "80%";
      botMsg.style.wordWrap = "break-word";
      botMsg.innerHTML = `${data.reply}`;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (err) {
      typing.remove();
      console.error(err);
    }
  }

  sendChat.onclick = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    sendMessage(text);
  };

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChat.onclick();
  });
})();






