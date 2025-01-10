import { NextPage } from "next";
import { LotteryResult } from "./api/lottery";
import useSWR from "swr";

const fetcher = async (url: string): Promise<LotteryResult> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

const Lottery: NextPage<{}> = () => {
  const { data: lottery, error } = useSWR("/api/lottery", fetcher);

  if (error) {
    return <p>データの取得に失敗しました: {error.message}</p>;
  }

  return (
    <>
      <p>おみくじ結果: {lottery?.result}</p>
    </>
  );
};

export default Lottery;
