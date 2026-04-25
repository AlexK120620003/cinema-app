'use client';
import { useState } from 'react';

export default function useLocalStorage(key = '', initialValue = '') { 
  const result = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : initialValue;
  const [value, setValue] = useState(result);
  const updateValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [value, updateValue] as const;
}
