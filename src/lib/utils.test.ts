import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges regular classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles falsy values gracefully', () => {
    expect(cn('class1', false, null, undefined, 0, '', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const condition = true;
    expect(cn('base-class', condition && 'conditional-class')).toBe('base-class conditional-class');
  });

  it('resolves tailwind class conflicts', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles arrays and objects', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
    expect(cn({ 'class1': true, 'class2': false })).toBe('class1');
  });

  it('handles complex combinations', () => {
    expect(
      cn(
        'base',
        ['arr1', 'arr2'],
        { obj1: true, obj2: false },
        'p-4',
        'p-2'
      )
    ).toBe('base arr1 arr2 obj1 p-2');
  });
});
