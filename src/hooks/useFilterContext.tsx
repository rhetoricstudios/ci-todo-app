import React, { createContext, useContext, useState, ReactNode } from 'react';

type FilterType = 'all' | 'active' | 'completed';
type FilterContextType = {
  selectedFilter: string;
  setSelectedFilter: (filter: FilterType) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  return (
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
