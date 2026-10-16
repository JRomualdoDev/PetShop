import React, { useState, useRef, useEffect } from 'react';
import { PawPrint, XCircle } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES, CHAT_QUICK_ACTIONS } from '../data/mockData';
import type { ChatMessage, NavPageId } from '../types';
import './ChatPage.css';

interface ChatPageProps {
  onNavigate?: (page: NavPageId) => void;
  onShowToast?: (message: string) => void;
}

let messageSequenceId = 1000;

function createMessageId(): string {
  messageSequenceId += 1;
  return `msg-${messageSequenceId}`;
}

function getFormattedCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate, onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotReply = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'Entendido! Estou buscando mais detalhes para te auxiliar. Como posso ajudar mais?';

      if (q.includes('veterin') || q.includes('clínica') || q.includes('saúde')) {
        replyText =
          'Temos excelentes veterinários e clínicas credenciadas na sua região, como a Dra. Carolina Castro e a Clínica VetVida 24h! Você pode agendar uma consulta diretamente na aba de Serviços.';
      } else if (q.includes('pedido') || q.includes('entrega') || q.includes('rastre')) {
        replyText =
          'Seu último pedido (#PC-84920) de Ração Premium Cães Adultos 15kg está a caminho com entrega prevista para amanhã até as 18h! 🚚';
      } else if (q.includes('produto') || q.includes('ração') || q.includes('brinquedo')) {
        replyText =
          'Temos diversas ofertas de rações super premium, brinquedos interativos e medicamentos com frete rápido. Deseja que eu te direcione ao catálogo de produtos? 🛍️';
      } else if (q.includes('adoção') || q.includes('adotar') || q.includes('gato') || q.includes('cachorro') || q.includes('pet')) {
        replyText =
          'Que maravilhoso! Temos animais amorosos aguardando um novo tutor na seção de Adoção, como a Luna, o Fred e a Mel. Todos já vermifugados e castrados! 🐾';
      } else if (q.includes('olá') || q.includes('oi') || q.includes('bom dia') || q.includes('boa tarde')) {
        replyText =
          'Olá! É um prazer falar com você. Em que posso te ajudar hoje no PetConnect?';
      }

      const botMsg: ChatMessage = {
        id: createMessageId(),
        sender: 'bot',
        text: replyText,
        time: getFormattedCurrentTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputValue).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: createMessageId(),
      sender: 'user',
      text: content,
      time: getFormattedCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) {
      setInputValue('');
    }

    generateBotReply(content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleQuickAction = (actionText: string) => {
    handleSendMessage(actionText);

    // Contextual toast or navigation guidance
    if (onShowToast) {
      onShowToast(`Consultando assistente sobre "${actionText}"...`);
    }

    if (actionText === 'Produtos' && onNavigate) {
      // Optional subtle hint
    }
  };

  return (
    <div className="desktop-chat-page" id="chat-page-view">
      <div className="chat-card-container">
        {/* Chat Card Header */}
        <header className="chat-card-header">
          <div className="chat-assistant-avatar">
            <PawPrint size={22} className="chat-paw-icon" />
          </div>
          <div className="chat-assistant-meta">
            <h1 className="chat-assistant-title">Assistente PetConnect</h1>
            <div className="chat-status-indicator">
              <span className="chat-status-dot" />
              <span className="chat-status-text">Online agora</span>
            </div>
          </div>
        </header>

        {/* Scrollable Messages Body */}
        <div className="chat-messages-body" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message-row ${msg.sender === 'user' ? 'is-user' : 'is-bot'}`}
            >
              {msg.sender === 'bot' && (
                <div className="message-bot-avatar" aria-hidden="true">
                  <PawPrint size={18} className="message-paw-icon" />
                </div>
              )}

              <div className="message-bubble">
                <p className="message-text">{msg.text}</p>
                <span className="message-timestamp">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row is-bot">
              <div className="message-bot-avatar" aria-hidden="true">
                <PawPrint size={18} className="message-paw-icon" />
              </div>
              <div className="message-bubble typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips Bar */}
        <div className="chat-quick-chips-wrapper" aria-label="Ações rápidas">
          {CHAT_QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              className="chat-chip-btn"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Chat Input & Submit Bar */}
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="chat-text-input"
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="chat-user-input"
            aria-label="Digite sua mensagem para o assistente"
          />
          <button
            type="submit"
            className="chat-send-btn"
            id="btn-chat-send"
            title="Enviar mensagem"
            aria-label="Enviar mensagem"
          >
            <XCircle size={20} className="chat-btn-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};
