import { useChatStore } from "../store/useChatStore";
import { useRef, useEffect, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useUserAuthStore } from "../store/userAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser
  } = useChatStore();
  const { authUser } = useUserAuthStore();
  const scrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Handler to check scroll position
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowScrollTop(scrollTop > 50);
    setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 50);
  };

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (scrollRef.current && messages) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="relative flex-1 flex flex-col justify-end">
        <div
          className="overflow-y-auto p-8 space-y-6 bg-transparent flex flex-col justify-end scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-base-200"
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollBehavior: "smooth", height: "100%" }}
        >
          {messages.map((message, idx) => {
            const isMe = message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] flex flex-col items-${isMe ? "end" : "start"}`}>
                  <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                    <img
                      src={isMe ? (authUser.profilePic || "/avatar.png") : (selectedUser.profilePic || "/avatar.png")}
                      alt="profile pic"
                      className="w-8 h-8 rounded-full border border-base-300 object-cover"
                    />
                    <div className={`rounded-2xl px-4 py-2 text-sm shadow-md ${isMe ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"}`}
                      style={{ wordBreak: "break-word" }}>
                      {message.text && <span>{message.text}</span>}
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="mt-2 rounded-lg max-w-[220px] max-h-[180px] border border-base-200"
                        />
                      )}
                    </div>
                  </div>
                  <span className={`text-xs mt-1 ${isMe ? "text-primary-content/70" : "text-base-content/60"}`}>{formatMessageTime(message.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Custom Scroll Buttons */}
        {showScrollTop && (
          <button
            className="absolute right-3 top-3 z-20 btn btn-circle btn-xs bg-base-300 shadow-lg opacity-80 hover:opacity-100"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            aria-label="Scroll to top"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
          </button>
        )}
        {showScrollBottom && (
          <button
            className="absolute right-3 bottom-3 z-20 btn btn-circle btn-xs bg-base-300 shadow-lg opacity-80 hover:opacity-100"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
              }
            }}
            aria-label="Scroll to bottom"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
          </button>
        )}
      </div>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;