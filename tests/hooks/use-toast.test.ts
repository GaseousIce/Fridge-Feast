import { describe, it, expect, vi } from "vitest";
import { reducer } from "../../src/hooks/use-toast";

type Action = Parameters<typeof reducer>[1];
type State = Parameters<typeof reducer>[0];

describe("use-toast reducer", () => {
  const initialState: State = { toasts: [] };

  it("should handle ADD_TOAST", () => {
    const action = { type: "ADD_TOAST" as const, toast: { id: "1", title: "Test" } };
    const state = reducer(initialState, action as Action);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: "1", title: "Test" });
  });

  it("should handle ADD_TOAST and respect TOAST_LIMIT", () => {
    const prevState: State = { toasts: [{ id: "1", title: "Old Toast" }] };
    const action = { type: "ADD_TOAST" as const, toast: { id: "2", title: "New Toast" } };
    const state = reducer(prevState, action as Action);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: "2", title: "New Toast" });
  });

  it("should handle UPDATE_TOAST", () => {
    const prevState: State = { toasts: [{ id: "1", title: "Old Title", description: "Old Desc" }] };
    const action = { type: "UPDATE_TOAST" as const, toast: { id: "1", title: "New Title" } };
    const state = reducer(prevState, action as Action);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: "1", title: "New Title", description: "Old Desc" });
  });

  it("should handle DISMISS_TOAST for a specific toast", () => {
    vi.useFakeTimers();
    const prevState: State = {
      toasts: [
        { id: "1", open: true },
        { id: "2", open: true },
      ],
    };
    const action = { type: "DISMISS_TOAST" as const, toastId: "1" };
    const state = reducer(prevState, action as Action);
    expect(state.toasts[0].open).toBe(false);
    expect(state.toasts[1].open).toBe(true);
    vi.useRealTimers();
  });

  it("should handle DISMISS_TOAST for all toasts", () => {
    vi.useFakeTimers();
    const prevState: State = {
      toasts: [
        { id: "1", open: true },
        { id: "2", open: true },
      ],
    };
    const action = { type: "DISMISS_TOAST" as const };
    const state = reducer(prevState, action as Action);
    expect(state.toasts[0].open).toBe(false);
    expect(state.toasts[1].open).toBe(false);
    vi.useRealTimers();
  });

  it("should handle REMOVE_TOAST for a specific toast", () => {
    const prevState: State = { toasts: [{ id: "1" }, { id: "2" }] };
    const action = { type: "REMOVE_TOAST" as const, toastId: "1" };
    const state = reducer(prevState, action as Action);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("2");
  });

  it("should handle REMOVE_TOAST for all toasts", () => {
    const prevState: State = { toasts: [{ id: "1" }, { id: "2" }] };
    const action = { type: "REMOVE_TOAST" as const };
    const state = reducer(prevState, action as Action);
    expect(state.toasts).toHaveLength(0);
  });
});
