import React, { useState } from "react"
import { AutoComplete } from '../../components'
import './style.css'

export const Main: React.FC = () => {
  const [value, setValue] = useState<string>('')
  return (
    <div className="container">
      <h1>Engineer Role</h1>
      <AutoComplete
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
