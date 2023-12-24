import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Link, Outlet, useParams } from "react-router-dom"


export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
  const [folders, setFolder] = useState(null)
  const params = useParams()


  useEffect(() => {
    console.log(params)
    LoadEmails()
    LoadFolders()
  }, [filterBy, params])

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

  async function onAddEmail(emailToAdd) {
    try {
      const savedEmail = await emailService.save(emailToAdd)
      setEmails((prevEmail) => [...prevEmail, savedEmail])
      // Sort emails by sentAt in descending order (newer to older)
      setEmails((prevEmails) => [...prevEmails.sort((a, b) => b.sentAt - a.sentAt)]);
    }
    catch (error) {
      console.log('Had issues saving email', error);
    }
  }

  console.log("rendedagain")
  console.log(params)
  if (!emails || !folders) return <div>Loading...</div>
  filterBy.status = params.folder
  const { status, txt, isRead } = filterBy
  return (

    <section className="email-index">
      <Link to="/email/compose"><button>Compose</button></Link>
      <EmailFolderList folders={folders} filterBy={{ status }} onSetFilter={onSetFilter} />
      {!params.emailId && <div>
        <EmailFilter filterBy={{ txt, isRead }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
      </div>}

      <Outlet context={{ test: 'yuval', onAddEmail, folders, status, onSetFilter }} />
    </section>
  )
} 