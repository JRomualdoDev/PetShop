import React, { useState, useRef, useEffect } from 'react';
import { PawPrint, Send, Sparkles, BookOpen, X, ArrowRight, HelpCircle } from 'lucide-react';
import {
  getChatbotReply,
  QUICK_CHAT_SUGGESTIONS,
  CHATBOT_KNOWLEDGE_BASE,
  type ChatbotQA,
} from '../data/chatbotKnowledgeBase';
import type { ChatMessage, NavPageId } from '../types';
import './ChatPage.css';

interface ChatPageProps {
  onNavigate?: (page: NavPageId) => void;
  onShowToast?: (message: string) => void;
}

let messageSequenceId = 2000;

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

const INITIAL_WELCOME_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-1',
    sender: 'bot',
    text: `Olá! Eu sou o Assistente Virtual Inteligente do PetConnect 🐾✨\n\nEstou aqui para tirar suas dúvidas com respostas completas e imediatas! Você pode me perguntar por exemplo:\n• *"Qual ração é a melhor?"*\n• *"Onde encontro um veterinário?"*\n• *"Como posso adotar um pet?"*\n\nClique em uma sugestão abaixo ou digite sua dúvida no campo de texto!`,
    time: getFormattedCurrentTime(),
  },
];

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate, onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_WELCOME_MESSAGES);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showFaqModal, setShowFaqModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotReply = (userQuery: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const { answer, matchedQA } = getChatbotReply(userQuery);

      let actionLabel: string | undefined = undefined;
      let actionPage: NavPageId | undefined = undefined;

      if (matchedQA?.targetPage) {
        actionPage = matchedQA.targetPage;
        if (actionPage === 'produtos') actionLabel = 'Ver Produtos Recomendados 🛍️';
        else if (actionPage === 'servicos') actionLabel = 'Agendar na aba Serviços 🩺';
        else if (actionPage === 'adocao') actionLabel = 'Conhecer Pets para Adoção ❤️';
        else if (actionPage === 'apoie') actionLabel = 'Apoiar uma Causa 🐾';
        else if (actionPage === 'perfil') actionLabel = 'Ver Meus Pedidos 🚚';
      }

      const botMsg: ChatMessage = {
        id: createMessageId(),
        sender: 'bot',
        text: answer,
        time: getFormattedCurrentTime(),
        actionPage,
        actionLabel,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
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

    if (onShowToast) {
      onShowToast(`Consultando resposta para "${actionText}"...`);
    }
  };

  const handleSelectFaqQuestion = (qa: ChatbotQA) => {
    setShowFaqModal(false);
    handleSendMessage(qa.question);
  };

  // Agrupa perguntas da base de conhecimento por categoria
  const groupedFaq = CHATBOT_KNOWLEDGE_BASE.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChatbotQA[]>);

  return (
    <div className="desktop-chat-page" id="chat-page-view">
      <div className="chat-card-container">
        {/* Chat Card Header */}
        <header className="chat-card-header">
          <div className="chat-assistant-avatar">
            <PawPrint size={22} className="chat-paw-icon" />
          </div>
          <div className="chat-assistant-meta">
            <div className="chat-title-badge-row">
              <h1 className="chat-assistant-title">Assistente PetConnect</h1>
              <span className="chat-badge-ai">
                <Sparkles size={12} /> Mock Ativo
              </span>
            </div>
            <div className="chat-status-indicator">
              <span className="chat-status-dot" />
              <span className="chat-status-text">Online • Respostas rápidas</span>
            </div>
          </div>

          <button
            type="button"
            className="chat-header-faq-btn"
            onClick={() => setShowFaqModal(true)}
            title="Ver catálogo de perguntas mockadas"
          >
            <BookOpen size={16} />
            <span>Perguntas Salvas</span>
          </button>
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

                {msg.actionPage && msg.actionLabel && onNavigate && (
                  <button
                    type="button"
                    className="message-action-btn"
                    onClick={() => onNavigate(msg.actionPage!)}
                  >
                    <span>{msg.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                )}

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
        <div className="chat-quick-chips-wrapper" aria-label="Ações rápidas e sugestões">
          <div className="chat-chips-header">
            <span className="chat-chips-label">
              <HelpCircle size={14} /> Perguntas sugeridas para você testar:
            </span>
          </div>
          <div className="chat-chips-scroll">
            {QUICK_CHAT_SUGGESTIONS.map((action) => (
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
        </div>

        {/* Chat Input & Submit Bar */}
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="chat-text-input"
            placeholder="Ex: Qual ração é a melhor? Onde encontro um veterinário?"
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
            disabled={!inputValue.trim()}
          >
            <Send size={18} className="chat-btn-icon" />
          </button>
        </form>
      </div>

      {/* MODAL COM TODAS AS PERGUNTAS MOCKADAS SALVAS */}
      {showFaqModal && (
        <div className="chat-modal-overlay" onClick={() => setShowFaqModal(false)}>
          <div className="chat-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="chat-modal-header">
              <div className="chat-modal-title-wrap">
                <BookOpen size={20} className="modal-title-icon" />
                <h3 className="chat-modal-title">Perguntas Mockadas Disponíveis</h3>
              </div>
              <button
                type="button"
                className="chat-modal-close-btn"
                onClick={() => setShowFaqModal(false)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <p className="chat-modal-desc">
              Clique em qualquer pergunta abaixo para enviá-la instantaneamente ao chat e visualizar a resposta mockada correspondente.
            </p>

            <div className="chat-modal-body">
              {Object.entries(groupedFaq).map(([category, items]) => (
                <div key={category} className="chat-faq-category-block">
                  <h4 className="chat-faq-category-title">{category}</h4>
                  <div className="chat-faq-list">
                    {items.map((qa) => (
                      <button
                        key={qa.id}
                        type="button"
                        className="chat-faq-item-btn"
                        onClick={() => handleSelectFaqQuestion(qa)}
                      >
                        <span className="chat-faq-item-text">{qa.question}</span>
                        <ArrowRight size={14} className="chat-faq-item-icon" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-modal-footer">
              <span className="chat-modal-footer-info">
                Salvo em: <code>PERGUNTAS_CHATBOT.md</code>
              </span>
              <button
                type="button"
                className="chat-modal-done-btn"
                onClick={() => setShowFaqModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
