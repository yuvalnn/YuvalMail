import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom"


export function EmailIndex() {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const { emailId, folder } = useParams()
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams,folder))
  
  /* const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter()) */
  const [folders, setFolder] = useState(null)


  useEffect(() => {
    // Sanitize the filterBy object
    const sanitizedFilterBy = {
      ...Object.fromEntries(
        Object.entries(filterBy).filter(([key, value]) => value !== '' && key !== 'status' && value !== null )
      ),
    };

    setSearchParams(sanitizedFilterBy)
     filterBy.status = folder;  
    LoadEmails()
    console.log('loadfolders')
    LoadFolders()
  }, [filterBy, folder])


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
      setEmails((prevEmails) =>
        prevEmails.map(email => email.id === savedEmail.id ? savedEmail : email))
    } catch (error) {
      console.log(error)
    }
  }

  async function onAddEmail(emailToAdd) {
    try {
      const savedEmail = await emailService.save(emailToAdd)

      if (folder === 'sent' ||
        (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
        setEmails((prevEmails) => [savedEmail, ...prevEmails])
      }

      //LoadEmails(emails)
      // Sort emails by sentAt in descending order (newer to older)
      //setEmails((prevEmails) => [...prevEmails.sort((a, b) => b.sentAt - a.sentAt)]);
    }
    catch (error) {
      console.log('Had issues saving email', error);
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId)
      setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
    } catch (err) {
      console.log('Had issues loading emails', err);
    }
  }

  if (!(emails)) return <div>Loading...</div>
  console.log("renderagain")

  const { status, txt, isRead, isDescending,isBySubject } = filterBy

  return (
    <section className="email-index">
      <Link to={`/email/${folder}/compose`}><button>Compose</button></Link>
      <EmailFolderList folders={folders} filterBy={{ status }} onSetFilter={onSetFilter} />
      {!emailId && <div>
        <EmailFilter filterBy={{ txt, isRead, isDescending,isBySubject }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
      </div>}
      <Outlet context={{ test: "yuval", onAddEmail, folders, onSetFilter, folder: folder, onRemoveEmail }} />
    </section>
  )
} 