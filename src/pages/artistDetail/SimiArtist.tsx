import { getSimiArtist } from "@/api/artists";
import { useQuery } from "@/common/use";
import { useRequest } from "ahooks";
import { FC, ReactElement } from "react";
import ArtistList from "../artists/ArtistList";

type SimiArtistProps = unknown;
const SimiArtist: FC<SimiArtistProps> = (): ReactElement => {
  const { id } = useQuery();

  const { data } = useRequest(() => getSimiArtist({ id }));

  return <div>

    <ArtistList list={data?.artists} />
  </div>;
};

export default SimiArtist;
