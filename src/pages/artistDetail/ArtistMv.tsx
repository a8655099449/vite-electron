import { getArtistMv, getArtistTopSongs } from "@/api/artists";
import useToBottomRequest from "@/common/hooks/useToBottomRequest";
import { useQuery } from "@/common/use";
import MvList from "@/components/Container/MvList";
import { useRequest } from "ahooks";
import PlayListTable from "../playList/PlayListTable";

const ArtistMv = () => {
  const { id } = useQuery();

  // const { data: { mvs =[]} = {} } = useRequest(() => getArtistMv(id));

  const { list: mvs } = useToBottomRequest({
    request: getArtistMv,
    listKey: "mvs",
    params: { id },
    limit:20
  });

  return (
    <div className="mt-10">
      <MvList mvs={mvs} />
    </div>
  );
};

export default ArtistMv;
