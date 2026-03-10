// Chat Widget for EU Откривател
(function() {
    // Create chat widget HTML
    const chatWidgetHTML = `
        <div id="chat-widget-container" class="chat-widget-hidden">
            <div class="chat-widget-header">
                <h3>🤖 AI Асистент</h3>
                <button id="chat-close-btn" class="chat-close-btn">✕</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="chat-message assistant-message">
                    <p>Здравей! 👋 Аз съм твоят AI асистент. Как мога да ти помогна с информация за Европейския съюз?</p>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Напиши твоя въпрос..." class="chat-input">
                <button id="chat-send-btn" class="chat-send-btn">Изпрати</button>
            </div>
        </div>
        <button id="chat-toggle-btn" class="chat-toggle-btn">💬 AI Асистент</button>
    `;

    // Create chat widget styles
    const chatWidgetStyles = `
        <style>
            /* Chat Widget Styles */
            #chat-widget-container {
                position: fixed;
                bottom: 100px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(30, 111, 191, 0.25);
                display: flex;
                flex-direction: column;
                z-index: 10000;
                animation: slideInUp 0.4s ease-out;
                border: 1px solid rgba(30, 111, 191, 0.1);
            }

            #chat-widget-container.chat-widget-hidden {
                display: none;
            }

            .chat-widget-header {
                background: linear-gradient(135deg, #1e6fbf 0%, #0a7fd1 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 16px 16px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-widget-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }

            .chat-close-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chat-close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #f9f9f9;
            }

            .chat-message {
                animation: fadeIn 0.4s ease-out;
                word-wrap: break-word;
                max-width: 100%;
            }

            .assistant-message {
                text-align: left;
            }

            .assistant-message p {
                background: white;
                padding: 10px 14px;
                border-radius: 12px;
                margin: 0;
                font-size: 14px;
                color: #333;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .user-message {
                text-align: right;
            }

            .user-message p {
                background: #1e6fbf;
                color: white;
                padding: 10px 14px;
                border-radius: 12px;
                margin: 0;
                font-size: 14px;
            }

            .chat-input-area {
                display: flex;
                gap: 8px;
                padding: 12px;
                border-top: 1px solid #e0e0e0;
                background: white;
                border-radius: 0 0 16px 16px;
            }

            .chat-input {
                flex: 1;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 10px 12px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                transition: all 0.3s ease;
            }

            .chat-input:focus {
                outline: none;
                border-color: #1e6fbf;
                box-shadow: 0 0 0 3px rgba(30, 111, 191, 0.1);
            }

            .chat-send-btn {
                background: #1e6fbf;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 16px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }

            .chat-send-btn:hover {
                background: #0a7fd1;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(30, 111, 191, 0.25);
            }

            .chat-send-btn:active {
                transform: translateY(0);
            }

            #chat-toggle-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #1e6fbf;
                color: white;
                border: none;
                border-radius: 50px;
                padding: 14px 24px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                z-index: 9999;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(30, 111, 191, 0.25);
                font-family: 'Poppins', sans-serif;
            }

            #chat-toggle-btn:hover {
                background: #0a7fd1;
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(30, 111, 191, 0.35);
            }

            #chat-toggle-btn:active {
                transform: scale(0.95);
            }

            #chat-widget-container.chat-widget-showing + #chat-toggle-btn {
                display: none;
            }

            @media (max-width: 600px) {
                #chat-widget-container {
                    width: 90vw;
                    height: 60vh;
                    max-width: 100%;
                    right: 5vw;
                    bottom: 80px;
                }
            }
        </style>
    `;

    // Common responses for the AI assistant
    const responses = {
        greeting: [
            'Здравей! 👋 Как мога да ти помогна?',
            'Добър момент! Какво искаш да научиш за ЕС?',
            'Привет! Разполагам с много информация за Европейския съюз. 😊'
        ],
        countries: [
            'ЕС има 27 членки: Австрия, Белгия, България, Хърватска, Кипър, Чехия, Дания, Естония, Финландия, Франция, Германия, Гърция, Унгария, Ирландия, Италия, Латвия, Литва, Люксембург, Малта, Нидерландия, Полша, Португалия, Румъния, Словакия, Словена, Испания и Швеция.',
            'Всички 27 европейски държави-членки на ЕС работят заедно за мир и просперитет!'
        ],
        history: [
            'ЕС е основан след Втората световна война. През 1957 г. се подписва Договорът на Рим. През 1992 г. се основава Европейския съюз.',
            'Историята на ЕС е история на мир и единение в Европа. Започна с 6 страни, сега е 27!'
        ],
        institutions: [
            'Основните институции на ЕС са: Европейска комисия, Европейски парламент, Съд на Европейския съюз и Европейска централна банка.',
            'Европейската комисия е изпълнителната власт, парламентът е представител на гражданите.'
        ],
        default: [
            'Интересен въпрос! 🤔 Засяга ли историята, институциите или политиките на ЕС?',
            'Можеш ли да уточниш повече? Интересува ли те история, география, политика или икономика?',
            'Добър въпрос! Може да ми помогнеш с повече детайли?'
        ]
    };

    function getResponse(userMessage) {
        const message = userMessage.toLowerCase();

        if (message.includes('привет') || message.includes('здравей') || message.includes('ало') || message.includes('привеееет')) {
            return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
        }
        if (message.includes('държав') || message.includes('страна') || message.includes('членк')) {
            return responses.countries[Math.floor(Math.random() * responses.countries.length)];
        }
        if (message.includes('история') || message.includes('основан') || message.includes('договор')) {
            return responses.history[Math.floor(Math.random() * responses.history.length)];
        }
        if (message.includes('институци') || message.includes('органи') || message.includes('комисия') || message.includes('парламент')) {
            return responses.institutions[Math.floor(Math.random() * responses.institutions.length)];
        }
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }

    // Initialize chat widget when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Inject styles
        const styleElement = document.createElement('div');
        styleElement.innerHTML = chatWidgetStyles;
        document.head.appendChild(styleElement.querySelector('style'));

        // Inject HTML
        const container = document.createElement('div');
        container.innerHTML = chatWidgetHTML;
        document.body.appendChild(container);

        // Get elements
        const chatWidget = document.getElementById('chat-widget-container');
        const toggleBtn = document.getElementById('chat-toggle-btn');
        const closeBtn = document.getElementById('chat-close-btn');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const messagesContainer = document.getElementById('chat-messages');

        let isOpen = false;

        // Toggle chat widget
        toggleBtn.addEventListener('click', function() {
            isOpen = !isOpen;
            if (isOpen) {
                chatWidget.classList.remove('chat-widget-hidden');
                chatWidget.classList.add('chat-widget-showing');
                chatInput.focus();
            } else {
                chatWidget.classList.add('chat-widget-hidden');
                chatWidget.classList.remove('chat-widget-showing');
            }
        });

        // Close chat widget
        closeBtn.addEventListener('click', function() {
            isOpen = false;
            chatWidget.classList.add('chat-widget-hidden');
            chatWidget.classList.remove('chat-widget-showing');
        });

        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message === '') return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user-message';
            userMsg.innerHTML = `<p>${message}</p>`;
            messagesContainer.appendChild(userMsg);

            // Clear input
            chatInput.value = '';

            // Simulate AI response with delay
            setTimeout(() => {
                const response = getResponse(message);
                const assistantMsg = document.createElement('div');
                assistantMsg.className = 'chat-message assistant-message';
                assistantMsg.innerHTML = `<p>${response}</p>`;
                messagesContainer.appendChild(assistantMsg);

                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 500);

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Check for auto-open via URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('ai') || window.location.hash === '#chat') {
            isOpen = true;
            chatWidget.classList.remove('chat-widget-hidden');
            chatWidget.classList.add('chat-widget-showing');
            chatInput.focus();
        }
    });
})();
