// Enhanced Intelligent Chatbot for Pro Green Earth
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userName = null;
        this.userEmail = null;
        this.lastTopic = null;
        
        // Knowledge base with intelligent patterns
        this.knowledgeBase = {
            greeting: {
                patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy'],
                responses: [
                    "Hello! Welcome to Pro Green Earth. How can I help you today?",
                    "Hi there! I'm here to answer your questions about our Barotse Rangelands Restoration Project.",
                    "Welcome! Ask me anything about our project, investment opportunities, or impact."
                ]
            },
            thanks: {
                patterns: ['thank', 'thanks', 'appreciate', 'grateful'],
                responses: [
                    "You're welcome! Is there anything else you'd like to know?",
                    "Happy to help! Feel free to ask more questions.",
                    "My pleasure! Let me know if you need more information."
                ]
            },
            project: {
                patterns: ['project', 'br4rp', 'barotse', 'rangeland', 'about', 'what is', 'tell me about', 'explain', 'describe'],
                response: "The Barotse Rangelands for Restoration Project (BR4RP) aims to transform 1.2 million hectares of degraded rangelands in Zambia's Western Province. We focus on improving cattle production, restoring ecosystems, and sequestering carbon while increasing farmer incomes by $3.3 million annually. Would you like to know more about our impact or investment opportunities?"
            },
            location: {
                patterns: ['where', 'location', 'zambia', 'western province', 'area', 'region'],
                response: "Our project is located in Zambia's Western Province, specifically in the Barotse region. We're working across 1.2 million hectares of rangeland, starting with an initial 200,000 hectares pilot project."
            },
            investment: {
                patterns: ['invest', 'fund', 'money', 'capital', 'finance', 'how much', 'cost', 'price', 'opportunity'],
                response: "We're seeking $10.2 million in funding for our initial 200,000 hectares. This includes $5.0M in debt financing and $5.2M from VCU sales. The project offers multiple revenue streams including carbon credits, improved livestock productivity, and dairy production. Our funding structure is designed for development finance institutions and impact investors. Would you like to schedule a meeting to discuss investment details?"
            },
            returns: {
                patterns: ['return', 'roi', 'profit', 'revenue', 'earn', 'gain'],
                response: "The project generates returns through multiple streams: carbon credit sales (VCUs), improved livestock productivity ($3.3M annual income increase for farmers), dairy production, and potential biodiversity credits. The project achieves financial sustainability through ongoing VCU sales over a 40-year crediting period. Would you like more details on the financial structure?"
            },
            impact: {
                patterns: ['impact', 'benefit', 'result', 'outcome', 'effect', 'achieve'],
                response: "Our project delivers transformative impact: 🌍 34 million tons of CO₂ sequestered over 40 years, 💰 $3.3M annual income increase for farmers, 🐄 Improved cattle production and health, 🌾 Restored degraded rangelands, 👥 Community empowerment with full backing from the Barotse Royal Establishment and Government of Zambia. Which aspect interests you most?"
            },
            carbon: {
                patterns: ['carbon', 'co2', 'emission', 'sequester', 'climate', 'greenhouse', 'mrv', 'verification'],
                response: "We expect to sequester over 34 million tons of CO₂ equivalent over 40 years, with average annual net carbon removals of 0.8 tons CO₂e per hectare. Our state-of-the-art MRV (Monitoring, Reporting, and Verification) systems ensure high-integrity carbon credits. The development share of gross carbon revenue covers all MRV costs and project development."
            },
            farmers: {
                patterns: ['farmer', 'income', 'community', 'local', 'people', 'livelihood'],
                response: "The project will raise farmer incomes by an estimated $3.3 million each year through: improved cattle production, reduced mortality rates (from 10% to 5%), increased calving rates (from 30% to 60%), better market access, and dairy production opportunities (daily lactation increased from 4 to 8 liters). Each farmer can earn an extra ZMW 25,000 from beef sales and ZMW 6,600 from milk sales annually."
            },
            cattle: {
                patterns: ['cattle', 'livestock', 'cow', 'animal', 'beef', 'meat', 'production'],
                response: "Our cattle improvement program focuses on: reducing liver condemnation from 80% to under 15%, decreasing mortality from 10% to 5%, increasing calving rates from 30% to over 60%, reducing market age from 5+ years to under 3 years, and increasing average carcass weight by 50kg. This results in ZMW 6,500 extra income per animal brought to market."
            },
            dairy: {
                patterns: ['milk', 'dairy', 'lactation'],
                response: "Through dual-purpose genetics, we're increasing daily lactation from 4 to 8 liters per animal and extending lactation periods from 90 to 200 days per year. Farmers can earn ZMW 6,600 from milk sales per year, with 2 liters per day available for sale after calf and household consumption."
            },
            government: {
                patterns: ['government', 'approval', 'support', 'backing', 'royal', 'litunga', 'ministry'],
                response: "We have full backing from the Barotse Royal Establishment (project conceived at the request of His Majesty the Litunga), Ministry of Livestock and Fisheries, Ministry of Green Economy and Environment, Environmental Management Agency, and Department of Forestry. All regulatory approvals and letters of no-objection have been secured."
            },
            team: {
                patterns: ['team', 'who', 'experience', 'expertise', 'leadership', 'management'],
                response: "Our team brings 30+ years in Zambian agriculture, 13+ years in agricultural consulting, and 10+ years in climate finance. We've successfully delivered projects for USAID, FCDO, EU, and Conservation International, impacting 8,000+ smallholder farmers. The project is a joint venture between established agribusiness (since 1958), leading consultancy, and climate finance experts."
            },
            timeline: {
                patterns: ['when', 'timeline', 'duration', 'how long', 'start', 'begin'],
                response: "The project has a 40-year crediting period. We're currently seeking funding for the initial 200,000 hectares pilot, which will then scale to the full 1.2 million hectares. All regulatory approvals are secured, and we're ready to begin implementation upon funding."
            },
            scale: {
                patterns: ['size', 'scale', 'hectare', 'area', 'large', 'big'],
                response: "The project covers 1.2 million hectares total, starting with an initial 200,000 hectares pilot. This makes it the first large-scale regenerative rangeland project in Zambia. Successful pilot implementation enables 6x expansion to the full project area."
            },
            contact: {
                patterns: ['contact', 'email', 'phone', 'reach', 'call', 'meeting', 'schedule', 'talk', 'discuss'],
                response: "You can reach us at:\n📧 Email: renier@progreenearth.africa\n📱 Phone: +260 96 849 3432\n\nWould you like me to help you draft an inquiry email, or would you prefer to call directly?"
            },
            name: {
                patterns: ['my name is', 'i am', "i'm", 'call me'],
                response: "Nice to meet you, {name}! How can I assist you with information about Pro Green Earth today?"
            }
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
        this.conversationHistory.push({ role: 'user', message: message });
        document.getElementById('quickOptions').innerHTML = '';
        
        // Extract name if mentioned
        this.extractUserInfo(message);
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getIntelligentResponse(message);
            this.addBotMessage(response);
            this.conversationHistory.push({ role: 'bot', message: response });
            
            // Show contextual quick options
            this.showContextualOptions(message);
        }, 800 + Math.random() * 800);
    }
    
    extractUserInfo(message) {
        const lowerMessage = message.toLowerCase();
        
        // Extract name
        const namePatterns = [
            /my name is (\w+)/i,
            /i am (\w+)/i,
            /i'm (\w+)/i,
            /call me (\w+)/i,
            /this is (\w+)/i
        ];
        
        for (let pattern of namePatterns) {
            const match = message.match(pattern);
            if (match && match[1]) {
                this.userName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
                break;
            }
        }
        
        // Extract email
        const emailPattern = /[\w.-]+@[\w.-]+\.\w+/;
        const emailMatch = message.match(emailPattern);
        if (emailMatch) {
            this.userEmail = emailMatch[0];
        }
    }
    
    getIntelligentResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for multi-word patterns first (more specific)
        for (let [topic, data] of Object.entries(this.knowledgeBase)) {
            if (data.patterns) {
                // Sort patterns by length (longest first for better matching)
                const sortedPatterns = [...data.patterns].sort((a, b) => b.length - a.length);
                
                for (let pattern of sortedPatterns) {
                    if (lowerMessage.includes(pattern)) {
                        this.lastTopic = topic;
                        
                        // Handle special cases
                        if (topic === 'greeting' && data.responses) {
                            return this.getRandomResponse(data.responses);
                        }
                        
                        if (topic === 'thanks' && data.responses) {
                            return this.getRandomResponse(data.responses);
                        }
                        
                        if (topic === 'name' && this.userName) {
                            return data.response.replace('{name}', this.userName);
                        }
                        
                        return data.response || data.responses[0];
                    }
                }
            }
        }
        
        // Context-aware responses based on conversation history
        if (this.lastTopic && (lowerMessage.includes('more') || lowerMessage.includes('tell me') || lowerMessage.includes('yes'))) {
            return this.getFollowUpResponse(this.lastTopic);
        }
        
        // Handle questions
        if (lowerMessage.includes('?')) {
            return this.handleQuestion(lowerMessage);
        }
        
        // Handle affirmations
        if (lowerMessage.match(/\b(yes|yeah|sure|ok|okay|yep|absolutely)\b/)) {
            if (this.lastTopic === 'investment' || this.lastTopic === 'contact') {
                return "Great! You can reach our team at renier@progreenearth.africa or call +260 96 849 3432 to schedule a detailed discussion. What specific aspects would you like to explore?";
            }
            return "Great! What would you like to know more about?";
        }
        
        // Handle negations
        if (lowerMessage.match(/\b(no|nope|not really|no thanks)\b/)) {
            return "No problem! Is there anything else about Pro Green Earth you'd like to know?";
        }
        
        // Fuzzy matching for typos and variations
        const fuzzyMatch = this.fuzzyMatch(lowerMessage);
        if (fuzzyMatch) {
            return fuzzyMatch;
        }
        
        // Default intelligent response
        return this.getSmartDefault(lowerMessage);
    }
    
    fuzzyMatch(message) {
        // Check for partial matches and common typos
        const keywords = {
            'invest': ['invst', 'invesment', 'investing'],
            'carbon': ['carbn', 'carbom'],
            'farmer': ['farmr', 'farmers'],
            'project': ['projct', 'projet'],
            'contact': ['contct', 'cantact']
        };
        
        for (let [correct, variations] of Object.entries(keywords)) {
            for (let variant of variations) {
                if (message.includes(variant)) {
                    // Find the topic with this keyword
                    for (let [topic, data] of Object.entries(this.knowledgeBase)) {
                        if (data.patterns && data.patterns.includes(correct)) {
                            return data.response || data.responses[0];
                        }
                    }
                }
            }
        }
        return null;
    }
    
    handleQuestion(question) {
        // Intelligent question handling
        if (question.includes('how') && (question.includes('work') || question.includes('does'))) {
            return this.knowledgeBase.project.response;
        }
        
        if (question.includes('why') && question.includes('invest')) {
            return "Investing in Pro Green Earth offers multiple benefits: high-integrity carbon credits, measurable social impact, government backing, scalable model, and multiple revenue streams. The project combines environmental restoration with economic development, making it an attractive impact investment opportunity. Would you like specific details on returns?";
        }
        
        if (question.includes('who')) {
            return this.knowledgeBase.team.response;
        }
        
        if (question.includes('where')) {
            return this.knowledgeBase.location.response;
        }
        
        if (question.includes('when')) {
            return this.knowledgeBase.timeline.response;
        }
        
        return null;
    }
    
    getFollowUpResponse(topic) {
        const followUps = {
            'project': "The project uses a co-design approach with the Barotse Royal Establishment, ensuring cultural alignment and community ownership. We focus on four key pillars: improved cattle health, better grazing management, market access, and carbon sequestration. Would you like details on any specific pillar?",
            'investment': "Our investment structure includes: 63% ($7.5M) going directly to communities, state-of-the-art MRV systems for carbon credit integrity, and a self-sustaining model through VCU sales. The project offers both financial returns and measurable impact. Shall I connect you with our investment team?",
            'impact': "Beyond carbon sequestration, we're creating lasting change: reducing cattle mortality, improving nutrition, empowering women through dairy production, and restoring biodiversity. The project aligns with multiple SDGs and has full government backing.",
            'carbon': "Our carbon credits are verified through rigorous MRV systems including satellite monitoring, soil sampling, and livestock tracking. We're targeting high-integrity markets and can provide detailed carbon accounting methodology.",
            'farmers': "Farmers benefit through multiple channels: improved cattle health (reducing losses), better breeding (faster growth), market access (higher prices), and dairy income. We provide training, veterinary services, and market linkages."
        };
        
        return followUps[topic] || "I'd be happy to provide more details! What specific aspect interests you?";
    }
    
    getSmartDefault(message) {
        // Analyze message for intent
        const wordCount = message.split(' ').length;
        
        if (wordCount > 10) {
            return "That's an interesting question! For detailed discussions, I recommend contacting our team directly at renier@progreenearth.africa or +260 96 849 3432. They can provide comprehensive answers tailored to your specific interests. Is there a particular aspect of the project you'd like me to explain?";
        }
        
        if (this.userName) {
            return `${this.userName}, I want to make sure I give you the best information. Could you rephrase your question? You can ask about our project, investment opportunities, impact, carbon credits, or how to get in touch with our team.`;
        }
        
        return "I'm here to help! You can ask me about:\n• The BR4RP project details\n• Investment opportunities\n• Environmental & social impact\n• Carbon sequestration\n• How to contact our team\n\nWhat would you like to know?";
    }
    
    getRandomResponse(responses) {
        const response = responses[Math.floor(Math.random() * responses.length)];
        return this.userName ? `${response.split('!')[0]}, ${this.userName}! ${response.split('!').slice(1).join('!')}` : response;
    }
    
    getRandomGreeting() {
        return this.getRandomResponse(this.knowledgeBase.greeting.responses);
    }
    
    showContextualOptions(message) {
        const lowerMessage = message.toLowerCase();
        let options = [];
        
        // Show contextual options based on last message
        if (lowerMessage.includes('invest') || lowerMessage.includes('fund')) {
            options = [
                { text: '💰 Returns & Revenue', message: 'What are the returns?' },
                { text: '📊 Financial Structure', message: 'Tell me about funding structure' },
                { text: '📧 Schedule Meeting', message: 'I want to schedule a meeting' },
                { text: '🌍 Impact Details', message: 'What is the impact?' }
            ];
        } else if (lowerMessage.includes('impact') || lowerMessage.includes('carbon')) {
            options = [
                { text: '👨‍🌾 Farmer Benefits', message: 'How do farmers benefit?' },
                { text: '🐄 Cattle Improvement', message: 'Tell me about cattle production' },
                { text: '🌱 Carbon Credits', message: 'How does carbon sequestration work?' },
                { text: '💰 Investment Info', message: 'Investment opportunities' }
            ];
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('meeting')) {
            options = [
                { text: '📊 About Project', message: 'Tell me about the project' },
                { text: '💰 Investment', message: 'Investment opportunities' },
                { text: '🌍 Impact', message: 'What is the impact?' }
            ];
        } else {
            // Default options
            options = [
                { text: '📊 About Project', message: 'Tell me about the project' },
                { text: '💰 Investment', message: 'Investment opportunities' },
                { text: '🌍 Impact', message: 'What is the impact?' },
                { text: '📧 Contact', message: 'How can I contact you?' }
            ];
        }
        
        this.displayQuickOptions(options);
    }
    
    showQuickOptions() {
        const options = [
            { text: '📊 About Project', message: 'Tell me about the project' },
            { text: '💰 Investment', message: 'Investment opportunities' },
            { text: '🌍 Impact', message: 'What is the impact?' },
            { text: '📧 Contact', message: 'How can I contact you?' }
        ];
        
        this.displayQuickOptions(options);
    }
    
    displayQuickOptions(options) {
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
