import { getArtistMv, getArtistTopSongs } from "@/api/artists";
import { useQuery } from "@/common/use";
import MvList from "@/components/Container/MvList";
import { useRequest } from "ahooks";
import PlayListTable from "../playList/PlayListTable";

const ArtistMv = () => {
  const { id } = useQuery();

  const { data: { mvs =[]} = {} } = useRequest(() => getArtistMv(id));

  return (
    <div className="mt-10">
      <MvList mvs={mvs} />
    </div>
  );
};

export default ArtistMv;
