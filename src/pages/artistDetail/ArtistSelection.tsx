import { getArtistTopSongs } from "@/api/artists";
import { useQuery } from "@/common/use";
import { useRequest } from "ahooks";
import PlayListTable from "../playList/PlayListTable";

const ArtistSelection = () => {
  const { id } = useQuery();

  const { data } = useRequest(() => getArtistTopSongs(id));
  console.log("👴2022-11-09 17:43:49 ArtistSelection.tsx line:9", data);
  return (
    <div>
      <h2>热门50首</h2>
      <PlayListTable
        data={data?.songs || []}
        hideHeader
        hideRowKeys={["歌手", "index"]}
      />
    </div>
  );
};

export default ArtistSelection;
