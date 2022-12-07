import React, { useEffect, useRef, useState } from "react"
import { getAutocompleteOptions } from "../../api"
import { useDebounce } from "../../hooks"
import { AutoCompleteDropdown } from "./AutoCompleteDropdown"
import './style.css'

interface AutoCompleteProps {
  value: string,
  onChange: (v: string) => void
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ value, onChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [respErr, setRespErr] = useState<string>('')
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setToggleDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [wrapperRef])

  const fetchData = async (query: string) => {
    try {
      var response = await getAutocompleteOptions(query)
      var parsedRes = await response.json()
      var data = parsedRes.data

      setOptions(data)
      setRespErr('')
    } catch (err) {
      setRespErr('Failed to load data. Try again later.')
    }

    setIsFetching(false)
  }

  const optimizedFn = useDebounce(fetchData, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsFetching(true)
    setToggleDropdown(true)
    optimizedFn(e.target.value)
  }

  const handleClick = (v: string) => {
    onChange(v)
    setToggleDropdown(false)
  }

  return (
    <div className="autocomplete-wrapper" ref={wrapperRef}>
      <input 
        className="autocomplete-input" 
        value={value} 
        onChange={handleChange}
      />
      {toggleDropdown && (
        <AutoCompleteDropdown 
          loading={isFetching}
          query={value}
          options={options}
          onClick={handleClick} 
        />
      )}
      {respErr && (
        <div className="api-error">{respErr}</div>
      )}
    </div>
  )
}
