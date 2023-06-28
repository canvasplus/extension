import React, { useMemo } from "react";

export type Conversation = {
  id: number;
  subject: string;
  state: "unread" | "read" | "archived";
  lastMessage?: string;
  lastMessageAt?: string;
  messageCount: number;
  participants: {
    id: number;
    name: string;
  }[];
  messages: {
    id: number;
    authorId: number;
    createdAt: string;
    body: string;
  }[];
};
export default function ConversationPreview(props: {
  conversation: Conversation;
  onClick: () => void;
}) {
  const lastUpdated = useMemo(() => {
    if (props.conversation.lastMessageAt == null) {
      return "No updates";
    } else {
      const date = new Date(props.conversation.lastMessageAt);

      // if today, return time
      if (date.toDateString() === new Date().toDateString()) {
        return date.toLocaleTimeString();
      }

      // if yesterday, return yesterday
      if (
        date.toDateString() ===
        new Date(new Date().getTime() - 86400000).toDateString()
      ) {
        return "Yesterday";
      }

      if (date.getFullYear() === new Date().getFullYear()) {
        return date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        });
      }

      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }, [props.conversation.lastMessageAt]);

  return (
    <div
      className="text-sm py-4 px-6 border-b-2 border-b-rose-700/10 hover:bg-rose-700/10 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className="">
          {props.conversation.participants[0]?.name ?? "No participants"}
        </h2>
        <p>{lastUpdated}</p>
      </div>
      <h3 className="font-semibold">{props.conversation.subject}</h3>
      <p className="text-gray-500 whitespace-normal overflow-ellipsis overflow-hidden">
        {props.conversation.lastMessage}
      </p>
    </div>
  );
}
