import React, {
  ForwardedRef,
  forwardRef,
  RefObject,
  useCallback,
  VFC,
} from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/style';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: IDM[] };
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
  isReacingEnd: boolean;
  srcollRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({
  chatSections,
  setSize,
  isReacingEnd,
  srcollRef,
}) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReacingEnd) {
      setSize((prevSize) => prevSize + 1).then(() => {
        if (srcollRef?.current) {
          srcollRef.current?.scrollTop(
            srcollRef.current?.getScrollHeight() - values.scrollHeight
          );
        }
      });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={srcollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};
export default ChatList;
