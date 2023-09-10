export function useLocalStorage() {
  const setValue = (key: string, value?: string) => {};
  const getValue = (key: string) => {};
  const deleteValue = (key: string) => {};

  return {
    setValue,
    getValue,
    deleteValue,
  };
}
