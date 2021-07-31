import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper,
} from '@layouts/workspace/style';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
  const onLogout = useCallback(() => {
    axios.post('/api/user/logout', null, { withCredentials: true }).then(() => {
      mutate(false);
    });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg
              src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })}
              alt="data.nickname"
            />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspace>test</Workspace>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>{/* <Menu></Menu> */}</MenuScroll>
        </Channels>
        <Chats>Chats</Chats>
      </WorkspaceWrapper>

      {children}
    </div>
  );
};

export default Workspace;
