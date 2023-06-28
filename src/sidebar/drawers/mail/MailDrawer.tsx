import React, { useEffect, useRef, useState } from "react";
import axios from "redaxios";
import ConversationPreview, { Conversation } from "./ConversationPreview";
import { Transition } from "react-transition-group";
import { TransitionStyles } from "../../../util/TransitionStyles";
import BinaryCarousel from "../../../util/BinaryCarousel";
import ConversationView from "./ConversationView";
import Button from "../../../util/Button";

export default function MailDrawer(props: { close: () => void }) {
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
            messages: [],
          };
        })
      );
    });
  }, []);

  const [currentConversation, setCurrentConversation] = useState<
    Conversation | undefined
  >(undefined);

  return (
    <div className="h">
      <div className="w-full h-screen pt-24">
        <div className="absolute top-0 left-0 z-50 bg-rose-50 w-full border-b-2 border-rose-700/10">
          <BinaryCarousel index={currentConversation == null ? 0 : 1}>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-lg">Inbox</h3>
              <div className="flex gap-2">
                <Button type="primary" size="sm" onClick={props.close}>
                  Close
                </Button>
                <Button type="secondary" size="sm" href="/conversations">
                  View Fullscreen
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-lg">Conversation</h3>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  size="sm"
                  onClick={() => setCurrentConversation(undefined)}
                >
                  Back
                </Button>
                <Button
                  type="secondary"
                  size="sm"
                  href={`/conversations?cpx-open-id${currentConversation?.id}`}
                >
                  View Fullscreen
                </Button>
                <Button
                  type="secondary"
                  size="sm"
                  href={`/conversations?cpx-open-id${currentConversation?.id}&reply=true`}
                >
                  Reply
                </Button>
              </div>
            </div>
          </BinaryCarousel>
        </div>
        <BinaryCarousel index={currentConversation == null ? 0 : 1}>
          <div className="relative h-screen overflow-y-scroll">
            {conversations.map((conversation) => (
              <ConversationPreview
                conversation={conversation}
                onClick={() => setCurrentConversation(conversation)}
              />
            ))}
          </div>
          <div className="relative h-screen overflow-y-scroll">
            {currentConversation != null && (
              <ConversationView
                conversation={currentConversation}
                onReturn={() => setCurrentConversation(undefined)}
              />
            )}
          </div>
        </BinaryCarousel>

        {/* <Transition
            in={currentConversation == null}
            timeout={{
              enter: 0,
              exit: 300,
            }}
            nodeRef={conversationListRef}
          >
            {(state) => (
              <div
                ref={conversationListRef}
                className="transform duration-300 w-full"
                style={conversationListStyles[state]}
              >
                {conversations.map((conversation) => (
                  <ConversationPreview conversation={conversation} />
                ))}
              </div>
            )}
          </Transition>

          <Transition
            in={currentConversation != null}
            timeout={{
              enter: 300,
              exit: 0,
            }}
            nodeRef={conversationViewRef}
          >
            {(state) => (
              <div
                ref={conversationViewRef}
                className="transform duration-300 w-full"
                style={conversationViewStyles[state]}
              >
                {conversations.map((conversation) => (
                  <ConversationPreview conversation={conversation} />
                ))}
              </div>
            )}
          </Transition> */}
      </div>
    </div>
  );
}
