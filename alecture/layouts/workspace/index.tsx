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
import React, { VFC, useCallback } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { data, error, revalidate, mutate } = useSWR(
    'http://localhost:3095/api/users',
    fetcher,
    { dedupingInterval: 100000 }
  );
  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      });
  }, []);

  if (data === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg
              src={gravatar.url(data?.nickname, { s: '28px', d: 'retro' })}
            />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll></MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
