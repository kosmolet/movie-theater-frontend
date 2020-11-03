import { useState, useCallback } from "react";

const useSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const updateSearchInput = useCallback((text) => {
    setSearchInput(text);
  }, []);

  return { searchInput, updateSearchInput };
};

export default useSearch;
