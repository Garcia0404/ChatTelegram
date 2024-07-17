import { MessageReceived, SendMessageCard } from "../components"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"
import { useParams } from "react-router-dom"
export const UserPage = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<receivedMessageServer[]>([])
  const socket = useSocket()
  const params = useParams()
  const id = params.id?.toString()
  const emailContact = () => {
    let email
    if (id) {
      email = atob(id)
    } else {
      email = ''
    }
    return email
  }

  useEffect(() => {
    socket?.emit('receivedMessages', { from: emailContact() })
    socket?.on('receivedMessages', (msg) => {
      setChat(msg)
    })
    socket?.on('privateMessage', ({ from, message }) => {
      if (from === emailContact()) {
        setChat(prev => [...prev, { from, message }])
      }
    })
    return () => {
      socket?.off('privateMessage')
    }
  }, [socket])
  useEffect(() => {
    socket?.emit('receivedMessages', { from: emailContact() })
    socket?.on('receivedMessages', (msg) => {
      setChat(msg)
    })
  }, [id])
  useEffect(() => {
    console.log(chat)
  }, [chat])
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setChat(prev => [...prev, { from: 'me', message: message }])
    socket?.emit('privateMessage', {
      sendTo: `${emailContact()}`,
      message: message
    })
    setMessage('')
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  return (
    <main className="flex-1 flex flex-col min-w-[555px] overflow-x-hidden whitespace-nowrap">
      <header className="bg-white dark:bg-gray-33 py-1 pe-3 ps-6 flex justify-between">
        <div className="flex gap-2.5 items-center">
          <button aria-label="This button opens the message inbox" className="m-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#766ac8" d="m6.921 12.5l5.793 5.792L12 19l-7-7l7-7l.714.708L6.92 11.5H19v1z" /></svg>
          </button>
          <span>
            <svg className="rounded-full fill-white" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="currentColor" /><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" /></svg>
          </span>
          <div>
            <div className="font-semibold text-base h-5">~Novia </div>
            <span className="text-[#aaaaaa] text-sm font-medium">last seen within a month</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#707579]">
          <span className="hover:bg-[#F4F4F4] dark:hover:bg-[#2B2B2B] rounded-full p-2 transition-all cursor-pointer">
            <svg className="stroke-[#AAAAAA] stroke-1" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M14.385 15.446a6.751 6.751 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 1 1-1.06 1.06zM6.46 13.884a5.25 5.25 0 1 1 7.43-.005l-.005.005l-.005.004a5.25 5.25 0 0 1-7.42-.004" clipRule="evenodd" /></svg>
          </span>
          <span className="hover:bg-[#F4F4F4] dark:hover:bg-[#2B2B2B] rounded-full p-2 transition-all cursor-pointer">
            <svg className="stroke-[#AAAAAA] stroke-0" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24"><path fill="currentColor" d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1" /></svg>
          </span>
          <span className="hover:bg-[#F4F4F4] dark:hover:bg-[#2B2B2B] rounded-full p-2 transition-all cursor-pointer">
            <svg className="stroke-[#AAAAAA] stroke-0" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M12 17a2 2 0 1 1 0 4a2 2 0 0 1 0-4m0-7a2 2 0 1 1 0 4a2 2 0 0 1 0-4m0-7a2 2 0 1 1 0 4a2 2 0 0 1 0-4" /></g></svg>
          </span>
        </div>
      </header>
      <div className="flex-1 bg-[url(https://images.hdqwalls.com/download/solar-system-minimalism-q1-2880x1800.jpg)] bg-center px-5 bg-cover overflow-hidden whitespace-nowrap">
        <div className="flex flex-col max-w-[650px] mx-auto h-full">
          <div className="flex-1 overflow-auto">
            <ul className="pt-5 pb-5 flex flex-col justify-start gap-2">
              {
                chat.map((msg, index) => {
                  if (id && msg.from === atob(id))
                    return (
                      <MessageReceived key={index}>
                        {msg.message}
                      </MessageReceived>
                    )
                  else return (
                    <SendMessageCard key={index}>
                      {msg.message}
                    </SendMessageCard>
                  )
                }
                )
              }
            </ul>
          </div>
          <div className="flex bg-green-main dark:bg-gray-33 px-4 py-[14px] rounded-2xl justify-between gap-3 mb-4 mt-3">
            <span className="text-[#707579cc]">
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18c4 0 5-4 5-4H7s1 4 5 4" /><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8" /><path fill="currentColor" d="m13 12l2 .012c.012-.462.194-1.012 1-1.012s.988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3m-5-1c.806 0 .988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3l2 .012C7.012 11.55 7.194 11 8 11" /></svg>
            </span>
            <form onSubmit={handleSubmit} className="flex-1">
              <label htmlFor="message">
                <input onChange={handleChange} value={message} className="font-medium bg-[transparent] outline-none text-sm w-full" type="text" placeholder="Message" />
              </label>
            </form>
            <span className="flex items-center text-[#707579cc]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M19.187 3.588a2.75 2.75 0 0 0-3.889 0L5.575 13.31a4.5 4.5 0 0 0 6.364 6.364l8.662-8.662a.75.75 0 0 1 1.061 1.06L13 20.735a6 6 0 0 1-8.485-8.485l9.723-9.723a4.25 4.25 0 0 1 4.124-1.139a4.25 4.25 0 0 1 3.025 3.025a4.25 4.25 0 0 1-1.139 4.124l-9.193 9.193a2.64 2.64 0 0 1-1.858.779a2.63 2.63 0 0 1-1.854-.779c-.196-.196-.338-.47-.43-.726a2.8 2.8 0 0 1-.168-.946c0-.7.284-1.373.775-1.864l8.132-8.131a.749.749 0 0 1 1.275.326a.75.75 0 0 1-.215.734l-8.131 8.132a1.15 1.15 0 0 0-.336.803c.003.204.053.405.146.587l.02.032c.22.215.501.332.786.332c.29 0 .58-.121.798-.34l9.192-9.192a2.75 2.75 0 0 0 0-3.89Z" /></svg>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
