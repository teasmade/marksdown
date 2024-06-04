import { getBookmark } from "@/app/lib/raindrop";
import MainPage from "@/app/modules/MainPage";

export const dynamic = "force-dynamic";

export default async function CollectionPage({
  params,
}: {
  params: { id: number };
}) {
  const bookmark = await getBookmark(params.id);
  return (
    <>
      <div>COLLECTION {params.id}</div>
      <MainPage bookmark={bookmark} />
    </>
  );
}
