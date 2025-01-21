import { act, renderHook } from "@testing-library/react";
import { useCounter } from "@/hooks/useCounter";

describe("useCounter", () => {
  it("初期値が0であること", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("incrementでカウントが増加すること", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("resetでカウントがリセットされること", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
