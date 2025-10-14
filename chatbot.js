// Custom Chatbot for Pro Green Earth
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greeting: [
                "Hello! Welcome to Pro Green Earth. How can I help you today?",
                "Hi there! I'm here to answer your questions about our Barotse Rangelands Restoration Project.",
                "Welcome! Ask me anything about our project, investment opportunities, or impact."
            ],
            project: "The Barotse Rangelands for Restoration Project (BR4RP) aims to transform 1.2 million hectares of degraded rangelands in Zambia's Western Province. We focus on improving cattle production, restoring ecosystems, and sequestering carbon while increasing farmer incomes by $3.3 million annually.",
            investment: "We're seeking $10.2 million in funding for our initial 200,000 hectares. This includes $5.0M in debt financing and $5.2M from VCU sales. The project offers multiple revenue streams including carbon credits, improved livestock productivity, and dairy production. Would you like to schedule a meeting?",
            impact: "Our project will sequester 34 million tons of CO₂ over 40 years, increase farmer incomes by $3.3M annually, improve cattle production, restore degraded rangelands, and benefit local communities. We have full backing from the Barotse Royal Establishment and Government of Zambia.",
            contact: "You can reach us at:\n📧 Email: renier@progreenearth.africa\n📱 Phone: +260 96 849 3432\nOr visit our Contact page to schedule a meeting!",
            carbon: "We expect to sequester over 34 million tons of CO₂ equivalent over 40 years, with average annual net carbon removals of 0.8 tons CO₂e per hectare. Our state-of-the-art MRV systems ensure high-integrity carbon credits.",
            farmers: "The project will raise farmer incomes by an estimated $3.3 million each year through improved cattle production, reduced mortality rates, increased calving rates, better market access, and dairy production opportunities.",
            default: "That's a great question! For detailed information, please contact our team at renier@progreenearth.africa or call +260 96 849 3432. You can also explore our website pages for more details."
        };
        
        this.init();
    }
    
    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addBotMessage(this.getRandomGreeting());
        this.showQuickOptions();
    }
    
    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-button" id="chatbotToggle">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                        <circle cx="8" cy="10" r="1.5"/>
                        <circle cx="12" cy="10" r="1.5"/>
                        <circle cx="16" cy="10" r="1.5"/>
                    </svg>
                </button>
                
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <h3>Pro Green Earth</h3>
                        <button class="chatbot-close" id="chatbotClose">&times;</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages"></div>
                    
                    <div class="chatbot-input-area">
                        <input 
                            type="text" 
                            id="chatbotInput" 
                            placeholder="Type your message..."
                            autocomplete="off"
                        />
                        <div class="quick-options" id="quickOptions"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        
        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.handleUserMessage(input.value.trim());
                input.value = '';
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbotWindow');
        window.classList.toggle('active');
        
        if (this.isOpen) {
            document.getElementById('chatbotInput').focus();
        }
    }
    
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    handleUserMessage(message) {
        this.addUserMessage(message);
        document.getElementById('quickOptions').innerHTML = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getResponse(message);
            this.addBotMessage(response);
            
            // Show relevant quick options after response
            if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('meeting')) {
                // Don't show options after contact info
            } else {
                this.showQuickOptions();
            }
        }, 1000 + Math.random() * 1000);
    }
    
    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.getRandomGreeting();
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('about') || lowerMessage.includes('what')) {
            return this.responses.project;
        }
        
        if (lowerMessage.includes('invest') || lowerMessage.includes('fund') || lowerMessage.includes('money') || lowerMessage.includes('capital')) {
            return this.responses.investment;
        }
        
        if (lowerMessage.includes('impact') || lowerMessage.includes('benefit') || lowerMessage.includes('result')) {
            return this.responses.impact;
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
            return this.responses.contact;
        }
        
        if (lowerMessage.includes('carbon') || lowerMessage.includes('co2') || lowerMessage.includes('emission')) {
            return this.responses.carbon;
        }
        
        if (lowerMessage.includes('farmer') || lowerMessage.includes('income') || lowerMessage.includes('community')) {
            return this.responses.farmers;
        }
        
        return this.responses.default;
    }
    
    getRandomGreeting() {
        return this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
    }
    
    showQuickOptions() {
        const options = [
            { text: '📊 About Project', message: 'Tell me about the project' },
            { text: '💰 Investment', message: 'Investment opportunities' },
            { text: '🌍 Impact', message: 'What is the impact?' },
            { text: '📧 Contact', message: 'How can I contact you?' }
        ];
        
        const optionsContainer = document.getElementById('quickOptions');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quick-option';
            btn.textContent = option.text;
            btn.addEventListener('click', () => {
                this.handleUserMessage(option.message);
            });
            optionsContainer.appendChild(btn);
        });
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
