import React, { useEffect, useState } from "react";
import { Conversation } from "./ConversationPreview";
import axios from "redaxios";
import { FiChevronLeft, FiCornerDownRight } from "react-icons/fi";
import Button from "../../../util/Button";

function ConversationViewSection(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 px-6 border-b-2 border-b-rose-700/10 text-sm">
      <p className="text-gray-500">{props.title}</p>
      {props.children}
    </div>
  );
}
export default function ConversationView(props: {
  conversation: Conversation;
  onReturn: () => void;
}) {
  const [conversation, setConversation] = useState<Conversation | undefined>(
    undefined
  );

  useEffect(() => {
    if (props.conversation == null) return;

    setConversation(undefined);

    axios.get(`/api/v1/conversations/${props.conversation.id}`).then((res) => {
      const data = res.data;

      setConversation({
        id: data.id,
        subject: data.subject,
        messageCount: data.message_count,
        lastMessage: data.last_message,
        lastMessageAt: data.last_message_at,
        state: data.workflow_state,
        participants: data.participants.map((participant: any) => {
          return {
            id: participant.id,
            name: participant.name,
          };
        }),
        messages: data.messages.map(
          (message: any): Conversation["messages"][0] => {
            return {
              body: message.body,
              authorId: message.author_id,
              createdAt: message.created_at,
              id: message.id,
            };
          }
        ),
      });
    });
  }, [props.conversation.id]);

  const [showExpandedParticipants, setShowExpandedParticipants] =
    useState(false);

  return (
    <div className="">
      {conversation != null ? (
        <>
          <ConversationViewSection title="Participants">
            {showExpandedParticipants ? (
              <div className="text-xs">
                <p>
                  {conversation.participants
                    .map((participant) => participant.name)
                    .join(", ")}
                </p>
                <p
                  className="text-rose-500 underline cursor-pointer"
                  onClick={() => setShowExpandedParticipants(false)}
                >
                  Show less
                </p>
              </div>
            ) : (
              <div>
                {conversation.participants
                  .slice(0, 2)
                  .map((participant) => participant.name)
                  .join(", ")}
                {conversation.participants.length > 2 && (
                  <p
                    onClick={() => setShowExpandedParticipants(true)}
                    className="ml-2 text-rose-500 cursor-pointer inline-block"
                  >
                    + {conversation.participants.length - 2}
                  </p>
                )}
              </div>
            )}
          </ConversationViewSection>
          <ConversationViewSection
            title={
              conversation.messageCount === 1
                ? "1 Message"
                : `${conversation.messageCount} Messages`
            }
          >
            <h3>{conversation.subject}</h3>
          </ConversationViewSection>
          <div className="overflow-x-scroll">
            {conversation.messages.map((message) => (
              <ConversationViewSection
                title={
                  conversation.participants.find(
                    (participant) => participant.id === message.authorId
                  )?.name ?? "Unknown"
                }
              >
                <p className="text-gray-500">
                  {new Date(message.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <br />
                <div>
                  {message.body.split("\n").map((line) => (
                    <div>
                      {line.trim().length >= 1 ? <p>{line}</p> : <br />}
                    </div>
                  ))}
                </div>
              </ConversationViewSection>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
