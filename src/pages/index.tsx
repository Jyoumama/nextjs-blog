import { useAtom } from "jotai";
import { filterAtom, Filter } from "@/atoms";
import { sortOrderAtom, SortOrder } from "@/atoms";
import Head from "next/head";
import { NextPage, GetStaticProps } from "next";

type PostStatus = "Active" | "Completed";

type Post = {
  id: number;
  title: string;
  date: string;
  status: PostStatus;
};

type HomeProps = {
  allPostsData: Post[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      allPostsData: [
        { id: 1, title: "First Post", date: "2024-01-01", status: "Active" },
        { id: 2, title: "Second Post", date: "2024-01-02", status: "Completed" },
        { id: 3, title: "Third Post", date: "2024-01-03", status: "Active" },
      ],
    },
  };
};

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  const [filter,setFilter] =useAtom(filterAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  
const filteredData = allPostsData.filter((post) => {
  if (filter === Filter.All) return true;
  if (filter === Filter.Active)return post.status === "Active";
  if (filter === Filter.Completed)return post.status === "Completed";
  return false;
});

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
