import {
  getCollections,
  getUser,
  getChildCollections,
} from "@/app/lib/raindrop";
import styles from "./styles.module.css";

export const dynamic = "force-dynamic";

export default async function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, collections, childCollections] = await Promise.all([
    getUser(),
    getCollections(),
    getChildCollections(),
  ]);

  const mergedCollections = () => {
    return [...collections.items, ...childCollections.items].sort((a, b) =>
      a.sort > b.sort ? 1 : -1,
    );
  };

  // function to recursively map through childCollections and return a <ul> with <li> elements for each sub collection that has a parent with the given id
  function renderChildCollections(parentId: number, depth: number = 1) {
    const children = childCollections.items.filter(
      (childCollection: any) => childCollection.parent?.$id === parentId,
    );

    if (children.length === 0) {
      return null;
    }

    const depthClassNames: { [key: number]: string } = {
      1: "pl-4 text-sm text-blue-600 hover:underline",
      2: "pl-8 text-xs text-red-600 hover:underline",
      3: "pl-8 text-xs text-green-600 hover:underline",
      4: "pl-8 text-xs text-yellow-600 hover:underline",
      5: "pl-8 text-xs text-purple-600 hover:underline",
    };

    const className =
      depthClassNames[depth] || "pl-8 text-xs text-gray-600 hover:underline";

    return (
      <ul className="">
        {children.map((childCollection: any) => {
          return (
            <li key={childCollection.id} className="">
              <a
                href={`/collections/${childCollection._id}`}
                className={className}
              >
                {childCollection.title} ({childCollection.count})
              </a>
              {renderChildCollections(childCollection._id, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <div>COL: {collections && collections.items.length}</div>
      <div>CHILDCOL: {childCollections && childCollections.items.length}</div>
      <div>MERGECOL: {mergedCollections().length}</div>
      <ul className="grid grid-cols-4 gap-4 p-4">
        {collections &&
          collections.items.map((collection: any) => {
            return (
              <>
                {" "}
                <li key={collection.id}>
                  <a
                    href={`/collections/${collection._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {collection.title} ({collection.count})
                  </a>
                  {renderChildCollections(collection._id)}
                </li>
              </>
            );
          })}
      </ul>
      {children}
    </>
  );
}
