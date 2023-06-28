import React, { useEffect, useState } from "react";
import axios from "redaxios";
import ConversationPreview, { Conversation } from "./ConversationPreview";

export default function MailDrawer() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    axios.get("/api/v1/conversations").then((res) => {
      const data = res.data;

      setConversations(
        data.map((conversation: any): Conversation => {
          return {
            id: conversation.id,
            subject: conversation.subject,
            state: conversation.state,
            lastMessage: conversation.last_message,
            lastMessageAt: conversation.last_message_at,
            messageCount: conversation.message_count,
            participants: conversation.participants.map((participant: any) => {
              return {
                id: participant.id,
                name: participant.name,
              };
            }),
          };
        })
      );
    });
  }, []);

  return (
    <div>
      {conversations.map((conversation) => (
        <ConversationPreview conversation={conversation} />
      ))}
    </div>
  );
}
