import useToBottomRequest from "@/common/hooks/useToBottomRequest";
import { useLayoutToBottom, useQuery } from "@/common/use";
import AlbumList from "@/components/Container/AlbumList";
import { useRequest } from "ahooks";
import { FC, ReactElement, useRef, useState } from "react";
import { getArtistAlbum } from "../../api/artists";

type ArtistAlbumProps = any;
const ArtistAlbum: FC<ArtistAlbumProps> = (): ReactElement => {
  const { id } = useQuery();

  const { list ,loading ,data} = useToBottomRequest({
    request: getArtistAlbum,
    params: { id },
    listKey: "hotAlbums",
  });

  return <div><AlbumList list={list} loading={loading} /></div>;
};

export default ArtistAlbum;
