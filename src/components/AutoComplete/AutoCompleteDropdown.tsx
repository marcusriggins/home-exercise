import React from 'react'
import { AutoCompleteDropdownOption } from './AutoCompleteDropdownOption'

interface AutoCompleteDropdownProps {
  loading: boolean
  query: string
  options: string[]
  onClick: (v: string) => void
}

export const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({ loading, query, options, onClick }) => {
  return (
    <>
      {loading ? (
        <div className="autocomplete-loading">Loading data ....</div>
      ) : (
        options.length ? (
          <ul className="autocomplete-dropdown">
            {options.map(option => {
              return (
                <AutoCompleteDropdownOption 
                  key={option}
                  query={query}
                  option={option} 
                  onClick={onClick}
                />
              )
            })}
          </ul>
        ) : (
          <div className="autocomplete-nosuggestion">No matches found.</div>
        )
      )}
    </>
  )
}
