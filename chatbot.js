        class CollabMateAI {
            constructor() {
                this.chatMessages = document.getElementById('chatMessages');
                this.chatInput = document.getElementById('chatInput');
                this.sendButton = document.getElementById('sendButton');
                this.typingIndicator = document.getElementById('typingIndicator');
                
                this.responses = {
                    about: {
                        keywords: ['about', 'who', 'tell me about', 'everything about', 'background', 'introduction'],
                        response: `<strong>Meet Likho Pikelela! 🚀</strong><br><br>
                        Likho is a passionate <strong>cybersecurity learner</strong>, aspiring <strong>ethical hacker</strong>, and creative developer who combines technical skills with an entrepreneurial mindset.<br><br>
                        He works on exciting projects in <strong>AI, design, and web development</strong>, while pursuing his dream of working in the cybersecurity field and eventually starting his own tech business.<br><br>
                        His journey blends <strong>creativity with technical expertise</strong>, making him a versatile professional in the tech space.`
                    },
                    skills: {
                        keywords: ['skills', 'abilities', 'expertise', 'what can', 'technologies', 'programming'],
                        response: `<strong>Likho's Technical Skills 💻</strong><br><br>
                        <ul>
                            <li><strong>Cybersecurity:</strong> Fundamentals & Digital Forensics</li>
                            <li><strong>Programming:</strong> HTML, CSS, JavaScript, Python</li>
                            <li><strong>Design:</strong> UI/UX Design with Figma</li>
                            <li><strong>AI Development:</strong> Chatbot Development & Teachable Machine</li>
                            <li><strong>Creative:</strong> Graphic Design & Branding Basics</li>
                            <li><strong>Web Development:</strong> Full-stack capabilities</li>
                        </ul>
                        These skills make him versatile in both <strong>security and development</strong> fields!`
                    },
                    projects: {
                        keywords: ['projects', 'work', 'portfolio', 'built', 'created', 'developed'],
                        response: `<strong>Likho's Amazing Projects 🛠️</strong><br><br>
                        <strong>🤖 AI Basic Concepts Chatbot</strong><br>
                        Explains AI/ML/Deep Learning concepts in simple language for beginners.<br>
                        <a href="https://skambi441.github.io/ChatBot/" target="_blank">→ Try the Chatbot</a><br><br>
                        
                        <strong>🌐 Professional Portfolio Website</strong><br>
                        A fully custom-coded portfolio showcasing his journey and skills.<br>
                        <a href="https://likhopikelela.github.io/" target="_blank">→ Visit Portfolio</a><br><br>
                        
                        <strong>🎨 Figma UI Prototype</strong><br>
                        Image upload interface design inspired by postimages.org.<br>
                        <a href="https://www.figma.com/proto/tyvn9R02qrzp3ptaie2meb/TechAid-Detect?node-id=26-74&starting-point-node-id=26%3A74" target="_blank">→ View Prototype</a><br><br>
                        
                        <strong>🔍 Cup Detector (AI)</strong><br>
                        Image classification model using Google's Teachable Machine.<br>
                        <a href="https://pikelelalikho.github.io/teachable_machine/" target="_blank">→ Test the Model</a><br><br>
                        
                        <strong>⚡ Content Generator Tool</strong><br>
                        Generates HTML, CSS, chatbot scripts, and Python code.<br>
                        <a href="https://likhopikelela.github.io/Code-Generator/" target="_blank">→ Try Generator</a><br><br>
                        
                        <strong>🎨 Image Generator Tool</strong><br>
                        Creates visual content from prompts for branding and social media.<br>
                        <a href="https://likhopikelela.github.io/Image-Generator/" target="_blank">→ Generate Images</a>`
                    },
                    education: {
                        keywords: ['education', 'study', 'school', 'certificates', 'training', 'bootcamp', 'courses'],
                        response: `<strong>Likho's Education & Certifications 🎓</strong><br><br>
                        <strong>🤖 CAPACITI AI Bootcamp (2025)</strong><br>
                        Comprehensive training in AI Basics, Ethics, and Hands-on Projects<br><br>
                        
                        <strong>🔒 Cybersecurity Fundamentals & Toolbox Training</strong><br>
                        Core security concepts and practical tools training<br><br>
                        
                        <strong>🛡️ Incident Response & Digital Forensics Internship</strong><br>
                        Real-world experience at the Cybersecurity Center<br><br>
                        
                        His education combines <strong>theoretical knowledge with practical experience</strong>, preparing him for the evolving cybersecurity landscape!`
                    },
                    resume: {
                        keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum'],
                        response: `<strong>Download Likho's Resume 📄</strong><br><br>
                        Get a comprehensive overview of Likho's experience, skills, and achievements:<br><br>
                        <a href="Docs&image/resume.pdf" target="_blank" style="background: #dc3545; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">📥 Download Resume (PDF)</a><br><br>
                        The resume includes detailed information about his projects, certifications, and technical capabilities!`
                    },
                    contact: {
                        keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'social', 'connect'],
                        response: `<strong>Connect with Likho 📬</strong><br><br>
                        <strong>📧 Email:</strong> <a href="mailto:pikelelalikho@gmail.com">pikelelalikho@gmail.com</a><br><br>
                        
                        <strong>💼 LinkedIn:</strong> <a href="https://www.linkedin.com/in/likho-pikelela-700495200/" target="_blank">Connect on LinkedIn</a><br><br>
                        
                        <strong>💻 GitHub:</strong> <a href="https://github.com/pikelelalikho" target="_blank">View Code Projects</a><br><br>
                        
                        Feel free to reach out for collaborations, opportunities, or just to say hello! Likho is always open to connecting with fellow tech enthusiasts. 🚀`
                    }
                };
                
                this.defaultResponse = `<strong>I'm here to help! 🤔</strong><br><br>
                I can tell you about Likho's:<br>
                • <strong>Background & Story</strong><br>
                • <strong>Technical Skills</strong><br>
                • <strong>Projects & Portfolio</strong><br>
                • <strong>Education & Certifications</strong><br>
                • <strong>Resume & Contact Info</strong><br><br>
                Try asking: "What projects has Likho worked on?" or "What are his skills?"`;
            }

            findBestResponse(input) {
                const lowercaseInput = input.toLowerCase();
                
                for (const [category, data] of Object.entries(this.responses)) {
                    for (const keyword of data.keywords) {
                        if (lowercaseInput.includes(keyword)) {
                            return data.response;
                        }
                    }
                }
                
                return this.defaultResponse;
            }

            async sendMessage(message = null) {
                const input = message || this.chatInput.value.trim();
                if (!input) return;

                // Add user message
                this.addMessage(input, 'user');
                
                // Clear input
                this.chatInput.value = '';
                
                // Show typing indicator
                this.showTyping();
                
                // Simulate thinking time
                await this.delay(1000 + Math.random() * 1000);
                
                // Hide typing indicator
                this.hideTyping();
                
                // Get and show response
                const response = this.findBestResponse(input);
                this.addMessage(response, 'bot');
            }

            addMessage(content, type) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${type}-message`;
                messageDiv.innerHTML = content;
                
                this.chatMessages.appendChild(messageDiv);
                this.scrollToBottom();
            }

            showTyping() {
                this.typingIndicator.style.display = 'flex';
                this.scrollToBottom();
            }
            // No additional code needed here; method is complete.
            hideTyping() {
                this.typingIndicator.style.display = 'none';
            }

            scrollToBottom() {
                setTimeout(() => {
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                }, 100);
            }

            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }

        // Initialize chatbot
        const chatbot = new CollabMateAI();

        // Event handlers
        function sendMessage() {
            chatbot.sendMessage();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendQuickMessage(message) {
            chatbot.sendMessage(message);
        }

        // Focus input on load
        window.addEventListener('load', () => {
            document.getElementById('chatInput').focus();
        });