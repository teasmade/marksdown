"use client";

import Link from "next/link";

function MainPage({ bookmark }) {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      {bookmark.items.map((item: any) => {
        return (
          <div
            key={item._id}
            className="max-w-sm rounded-lg border border-gray-200 bg-white shadow"
          >
            <img className="rounded-t-lg" src={item.cover} alt={item.title} />

            <div className="space-y-2 p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {item.title}
              </h5>

              <p className="mb-3 font-normal text-gray-700">{item.excerpt}</p>
              <p className="text-xs text-gray-400"> {item.domain} </p>
              <Link
                href={item.link}
                target="_blank"
                className="inline-flex items-center rounded-lg bg-orange-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                Go to bookmark
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default MainPage;
