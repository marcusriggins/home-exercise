import React from 'react'

interface AutoCompleteDropdownOptionProps {
  query: string
  option: string
  onClick: (v: string) => void
}

export const AutoCompleteDropdownOption: React.FC<AutoCompleteDropdownOptionProps> = ({ query, option, onClick }) => {
  const startIdx = option.toLowerCase().indexOf(query.toLowerCase())
  return (
    <li 
      className="autocomplete-dropdown-item"
      onClick={() => onClick(option)}
    >
      {startIdx >= 0 ? (
        <>
          {option.slice(0, startIdx)}
          <span>{option.slice(startIdx, startIdx + query.length)}</span>
          {option.slice(startIdx + query.length)}
        </>
      ) : (
        option
      )}
      
    </li>
  )
}
