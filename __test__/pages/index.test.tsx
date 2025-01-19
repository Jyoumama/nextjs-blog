import { render, screen } from "@testing-library/react";
import Home from "@/pages/";

describe("Home Page", () => {
  it("リンクページ'First Post'を持つ", () => {

    const mockPosts = [
      { id: 1, title: "First Post", date: "2024-01-01" },
      { id: 2, title: "Second Post", date: "2024-01-02" },
      { id: 3, title: "Third Post", date: "2024-01-03" },
    ]
    render(<Home allPostsData={mockPosts} />);

    const link = screen.getByRole("link", { name: "First Post" });
    expect(link).toBeInTheDocument();
  });
});
