import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"




export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
  const [folders, setFolder] = useState(null)


  useEffect(() => {

    LoadEmails()
    LoadFolders()
    console.log('Mounted/Effect')
    console.log(filterBy)

  },

    [filterBy])

  async function LoadFolders() {

    try {
      const folders = await emailService.queryFolders()
      console.log(folders)
      setFolder(folders)

    } catch (error) {
      console.log(error)
    }

  }
  async function LoadEmails() {
    try {
      const emails = await emailService.queryEmails(filterBy)
      console.log(emails)
      setEmails(emails)
    } catch (error) {
       console.log('Had issues loading emails', error)
    }

  }

  function onSetFilter(filterBy) {

    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
  }

  async function onUpdateEmail(emailToUpdate) {

    try {

      const savedEmail = await emailService.save(emailToUpdate)

      setEmails((prevEmails) => prevEmails.map(email => email.id === savedEmail.id ? savedEmail : email))
      

    } catch (error) {
      console.log(error)
    }

  }

  console.log("rendedagain")
  if (!emails || !folders) return <div>Loading...</div>
  const { status, txt, isRead } = filterBy
  return (

    <section className="email-index">
      <Link to="/email/compose"><button>Compose</button></Link>
      <EmailFolderList folders={folders} filterBy={{ status }} onSetFilter={onSetFilter} />
      <EmailFilter filterBy={{ txt, isRead }} onSetFilter={onSetFilter} />
      <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />

      <Outlet />
    </section>
  )
} 