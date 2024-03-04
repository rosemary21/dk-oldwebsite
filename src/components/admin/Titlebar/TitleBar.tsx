import { useState } from 'react'
import "./Titlebar.css"

export default function AdminTitleBar() {
  const [seachVal, setSearchVal] = useState("")

  return (
    <div className='title-bar-wrapper'>
      <div className='search-bar-wrapper'>
        <i className="bx bx-search" />
        <input 
          className='adminSearch' 
          type="search" 
          placeholder='Type to search' 
          value={seachVal} 
          onChange={e => setSearchVal(e.target.value)} 
        />
      </div>

      <div className='user-bar-wrapper'>
        <div><i className="bx bx-envelope" /><span className='message-count'>2</span></div>
        <i className="bx bx-bell" />
        <img src="/images/Admin/user.png" alt="user" />
      </div>
    </div>
  )
}
