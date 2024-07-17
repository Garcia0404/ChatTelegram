type sendTo = {
  sendTo:string
  message:string
}
type msgsFrom = {
  from:string
}
type receivedMessageServer = {
  from:string
  message:string
}
interface ServerToClientEvents {
  message: (message: string) => void
  privateMessage:({from,message}:{from:string,message:string}) => void
  Message: (message: string) => void
  receivedMessages:(message: receivedMessageServer[]) => void
}
interface ClientToServerEvents {
  message: (message: string) => void
  register: (register:string) => void
  privateMessage:(sendMessage: sendTo) => void
  receivedMessages:(message: msgsFrom) => void
}
interface LastMessage {
  name:string
  email:string
  date:string
  hour:string
  lastMessage:string
}