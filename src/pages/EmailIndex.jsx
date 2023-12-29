import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { EmailCompose } from "./EmailCompose"


export function EmailIndex() {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const { emailId, folder } = useParams()
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams,folder))
  /* const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter()) */
  const [folders, setFolder] = useState(null)

  // Compose init
  
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

  function onSetCompose(ev){    
    let { name: field, value } = ev.target      
    const updatedSearchParams = {  [field]: value, ...filterBy };
    setSearchParams(updatedSearchParams)
  }

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
        /* filter */
        if (folder === 'star'){          
          setEmails((prevEmails) => 
          prevEmails.filter(email => email.isStarred ))
        }
    } catch (error) {
      console.log(error)
    }
  }

  async function onAddEmail(emailToAdd) {
    try {
      const savedEmail = await emailService.save(emailToAdd)
      showSuccessMsg('The email was sent successfully.')
      if (folder === 'sent' ||
        (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
        setEmails((prevEmails) => [savedEmail, ...prevEmails])
      }
    }
    catch (error) {
      showErrorMsg('Failed to send the email. Please check your connection and try again')
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

  const { status, txt, isRead, isDescending,isBySubject} = filterBy
  return (
    <section className="email-index">
      { searchParams.get('compose') ==='new' && <EmailCompose onAddEmail={onAddEmail} folder={folder} onSetFilter={onSetFilter} filterBy={filterBy}   />}
      {/* <Link to={`/email/${folder}/compose`}><button>Compose</button></Link> */}
      <button id="compose" value={'new'} name = "compose" onClick={onSetCompose}>Compose</button>
      <EmailFolderList folders={folders} filterBy={{ status }} onSetFilter={onSetFilter} />
      {!emailId && <div>
        <EmailFilter filterBy={{ txt, isRead, isDescending,isBySubject }} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
      </div>}
      <Outlet context={{ test: "yuval", onAddEmail, folders, onSetFilter, folder: folder, onRemoveEmail }} />
    </section>
  )
} 