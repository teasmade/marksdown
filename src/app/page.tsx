import { getBookmark, getCollections } from "@/app/lib/raindrop";
import MainPage from "./modules/MainPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bookmark = await getBookmark(0);
  return (
    <>
      <MainPage bookmark={bookmark} />
    </>
  );
}
