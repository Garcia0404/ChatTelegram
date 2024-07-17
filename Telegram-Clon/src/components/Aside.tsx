import { FormEvent, useEffect, useState } from "react"
import { MessageCard } from "./aside/MessageCard"
import { NewChat } from "./aside/NewChat"
import { useAppContext } from "../hooks"
export const Aside = () => {
  const { email, password } = useAppContext()
  const [data, setData] = useState([])
  useEffect(() => {
    console.log('aside renderizado')
  }, [])
  const body = {
    email: email,
    password: password
  }
  fetch('/signin/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => setData(data))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <aside className="w-96 -translate-x-full">
      <div className="bg-white dark:bg-gray-33 h-screen relative group/item overflow-hidden border-e border-e-[#323232]">
        <header className="flex p-2 gap-3">
          <span className="cursor-pointer w-10 h-10 hover:bg-[#F4F4F5] dark:hover:bg-[#272727] rounded-full p-3 grid place-content-center text-[#707579] dark:text-[#B2B5B7]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2" /></svg>
          </span>
          <form onSubmit={handleSubmit} className="relative flex-1">
            <label htmlFor="search">
              <input className="p-2 ps-10 rounded-3xl bg-[#F4F4F5] dark:bg-[#2C2C2C] w-full text-black" type="text" placeholder="Search" />
              <span className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="#B2B5B7" d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.98 6.98 0 0 0 4.875-1.975z" /></svg>
              </span>
            </label>
          </form>
        </header>
        <ul className="grid p-2">
          {
            data.length !== 0 &&
            data.map((chat: LastMessage, index: number) => (
              <MessageCard hour={chat.hour} name={chat.name} lastMessage={chat.lastMessage} email={chat.email} key={index} />
            ))
          }
        </ul>
        <NewChat />
      </div>
    </aside>
  )
}
