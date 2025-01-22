//このコメントは、Pull Requestのテスト用のものです。
//src/pages/index.tsx
import { useAtom } from "jotai";
import { filterAtom, Filter } from "@/atoms";
import { sortOrderAtom, SortOrder } from "@/atoms";
import Head from "next/head";
import { NextPage } from "next";

type Post = {
  id: number;
  title: string;
  date: string;
};

type HomeProps = {
  allPostsData: Post[];
};

export const getStaticProps = async () => {
  return {
    props: {
      allPostsData: [
        { id: 1, title: "First Post", date: "2024-01-01" },
        { id: 2, title: "Second Post", date: "2024-01-02" },
        { id: 3, title: "Third Post", date: "2024-01-03" },
      ],
    },
  };
};

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  // フィルタリングとソートの状態を管理
  const [filter, setFilter] = useAtom(filterAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

  // フィルタリング処理
  const filteredData = allPostsData.filter((post) => {
    if (filter === Filter.All) return true;
    if (filter === Filter.Active) return post.id % 2 !== 0; // Activeの条件
    if (filter === Filter.Completed) return post.id % 2 === 0; // Completedの条件
  });

  // ソート処理
  const sortedPosts = [...filteredData].sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );

  const posts =
    sortOrder === SortOrder.Ascending ? sortedPosts : [...sortedPosts].reverse();

  return (
    <>
      <Head>
        <title>Filtered and Sorted Blog</title>
        <meta name="description" content="Filtered and sorted blog posts" />
      </Head>
      <main>
        <h1>Welcome to my blog!</h1>

        {/* フィルタ切り替え */}
        <div>
          <label>
            <input
              type="radio"
              name="filter"
              value={Filter.All}
              checked={filter === Filter.All}
              onChange={() => setFilter(Filter.All)}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value={Filter.Active}
              checked={filter === Filter.Active}
              onChange={() => setFilter(Filter.Active)}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value={Filter.Completed}
              checked={filter === Filter.Completed}
              onChange={() => setFilter(Filter.Completed)}
            />
            Completed
          </label>
        </div>

        {/* ソート切り替え */}
        <div>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value={SortOrder.Ascending}
              checked={sortOrder === SortOrder.Ascending}
              onChange={() => setSortOrder(SortOrder.Ascending)}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value={SortOrder.Descending}
              checked={sortOrder === SortOrder.Descending}
              onChange={() => setSortOrder(SortOrder.Descending)}
            />
            Descending
          </label>
        </div>

        {/* フィルタリング＆ソートされたデータの表示 */}
        <section>
          <h2>Filtered and Sorted Blog Posts</h2>
          {posts.map(({ id, title, date }) => (
            <div key={id}>
              <p>
                {title} - {date}
              </p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
