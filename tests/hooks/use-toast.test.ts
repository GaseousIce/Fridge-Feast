import { describe, it, expect, vi } from 'vitest';
import { reducer } from '../../src/hooks/use-toast';

describe('use-toast reducer', () => {
  const initialState = { toasts: [] };

  it('should handle ADD_TOAST', () => {
    const action = { type: 'ADD_TOAST', toast: { id: '1', title: 'Test' } };
    const state = reducer(initialState, action as any);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: '1', title: 'Test' });
  });

  it('should handle ADD_TOAST and respect TOAST_LIMIT', () => {
    const prevState = { toasts: [{ id: '1', title: 'Old Toast' }] as any };
    const action = { type: 'ADD_TOAST', toast: { id: '2', title: 'New Toast' } };
    const state = reducer(prevState, action as any);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: '2', title: 'New Toast' });
  });

  it('should handle UPDATE_TOAST', () => {
    const prevState = { toasts: [{ id: '1', title: 'Old Title', description: 'Old Desc' }] as any };
    const action = { type: 'UPDATE_TOAST', toast: { id: '1', title: 'New Title' } };
    const state = reducer(prevState, action as any);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0]).toEqual({ id: '1', title: 'New Title', description: 'Old Desc' });
  });

  it('should handle DISMISS_TOAST for a specific toast', () => {
    vi.useFakeTimers();
    const prevState = { toasts: [{ id: '1', open: true }, { id: '2', open: true }] as any };
    const action = { type: 'DISMISS_TOAST', toastId: '1' };
    const state = reducer(prevState, action as any);
    expect(state.toasts[0].open).toBe(false);
    expect(state.toasts[1].open).toBe(true);
    vi.useRealTimers();
  });

  it('should handle DISMISS_TOAST for all toasts', () => {
    vi.useFakeTimers();
    const prevState = { toasts: [{ id: '1', open: true }, { id: '2', open: true }] as any };
    const action = { type: 'DISMISS_TOAST' };
    const state = reducer(prevState, action as any);
    expect(state.toasts[0].open).toBe(false);
    expect(state.toasts[1].open).toBe(false);
    vi.useRealTimers();
  });

  it('should handle REMOVE_TOAST for a specific toast', () => {
    const prevState = { toasts: [{ id: '1' }, { id: '2' }] as any };
    const action = { type: 'REMOVE_TOAST', toastId: '1' };
    const state = reducer(prevState, action as any);
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe('2');
  });

  it('should handle REMOVE_TOAST for all toasts', () => {
    const prevState = { toasts: [{ id: '1' }, { id: '2' }] as any };
    const action = { type: 'REMOVE_TOAST' };
    const state = reducer(prevState, action as any);
    expect(state.toasts).toHaveLength(0);
  });
});
