import React from 'react'

export const MessageReceived:React.FC<{children:string}> = ({children}) => {
  return (
    <li className="bg-green-main dark:bg-[#212121] rounded-e-2xl rounded-s-lg py-1 pe-3 ps-2 max-w-96 break-words flex me-auto text-black dark:text-white">
      <p className='break-all'>
        {children}
      </p>
    </li>
  )
}
