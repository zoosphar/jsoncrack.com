"use client";

import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { BottomBar } from "src/containers/Editor/BottomBar";
import { Toolbar } from "src/containers/Toolbar";
import { EditorWrapper } from "src/layout/EditorWrapper";
import { Loading } from "src/layout/Loading";
import useFile from "src/store/useFile";
import useJson from "src/store/useJson";

const Panes = dynamic(() => import("src/containers/Editor/Panes"));

const StyledPageWrapper = styled.div`
  height: calc(100vh - 27px);
  width: 100%;

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default function Page() {
  const query = useSearchParams();
  const loading = useJson(state => state.loading);
  const hasQuery = React.useMemo(() => query !== null && Object.keys(query).length > 0, [query]);
  const checkEditorSession = useFile(state => state.checkEditorSession);

  React.useEffect(() => {
    if (query) checkEditorSession(query.get("json") || "");
  }, [checkEditorSession, query]);

  if (loading) {
    return (
      <StyledEditorWrapper>
        <Head>
          <title>Editor | JSON Crack</title>
          {hasQuery && <meta name="robots" content="noindex,nofollow" />}
        </Head>
        <Loading message="Preparing the editor for you..." loading />
      </StyledEditorWrapper>
    );
  }

  return (
    <EditorWrapper>
      <StyledEditorWrapper>
        <Head>
          <title>Editor | JSON Crack</title>
          {hasQuery && <meta name="robots" content="noindex,nofollow" />}
        </Head>
        <StyledPageWrapper>
          <Toolbar />
          <StyledEditorWrapper>
            <Panes />
          </StyledEditorWrapper>
        </StyledPageWrapper>
        <BottomBar />
      </StyledEditorWrapper>
    </EditorWrapper>
  );
}
