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
  const {emailId, folder } = useParams()
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams, folder))  
  /* const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter()) */
  const [folders, setFolder] = useState(null)

  // Compose init

  useEffect(() => {
    // Sanitize the filterBy object    
    const sanitizedFilterBy = {
      ...Object.fromEntries(
        Object.entries(filterBy).filter(([key, value]) => value !== '' && key !== 'status' && value !== 'null')
      ),
    };

    setSearchParams(sanitizedFilterBy)
    filterBy.status = folder;
    LoadEmails()
    console.log('loadfolders')
    LoadFolders()
  }, [filterBy, folder])

  function onCompose(ev) {
    let { name: field, value } = ev.target    
    const updatedSearchParams = { [field]: value, ...filterBy };
    // Sanitize the filterBy object
    const sanitizedFilterBy = {
    ...Object.fromEntries(
    Object.entries(updatedSearchParams).filter(([key, value]) => value !== '' && key !== 'status' && value !== 'null')),};          
    setSearchParams(sanitizedFilterBy)
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
      if (folder === 'star') {
        setEmails((prevEmails) =>
          prevEmails.filter(email => email.isStarred))
      }
    } catch (error) {
      console.log(error)
    }
  }

  //   async function onDraftEmail(email) {
  //     try {
  //       debugger


  //     } catch (err) {
  //         console.log('onDraftEmail:Had issues update email', err);
  //     }
  // }

  async function onAddEmail(emailToAdd) {
    try {
      // New email
      
      if (searchParams.get('compose') === 'new') {
        const savedEmail = await emailService.save(emailToAdd)
        showSuccessMsg('Draft saved')
        if (folder === 'sent' ||
          (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
          setEmails((prevEmails) => [savedEmail, ...prevEmails])
        }
        if (folder === 'draft') {
          setEmails((prevEmails) => [savedEmail, ...prevEmails])
        }
        const updatedSearchParams = { 'compose': savedEmail.id, ...filterBy };
        setSearchParams(updatedSearchParams)
      }
      else {  // Draft      
        let emailTosave = await emailService.getById(searchParams.get('compose'))
        emailTosave = { ...emailTosave, ...emailToAdd }
        const savedEmail = await emailService.save(emailTosave)
        showSuccessMsg('Draft saved')
        if (folder === 'sent' ||
          (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
          setEmails((prevEmails) => [savedEmail, ...prevEmails])
        }
        if (folder === 'draft') {         
          if(!savedEmail.sentAt){            
            setEmails((prevEmails) =>
            prevEmails.map(email => (email.id === savedEmail.id) ? savedEmail : email))            
          }
          else
          {
            setEmails((prevEmails) =>
            prevEmails.filter(email => email.id === savedEmail.id ? !savedEmail.sentAt : !email.sentAt  ))
          }
        }
      }
      if (emailToAdd.sentAt) {
        showSuccessMsg('The email was sent successfully.')
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

  if (!emails) return <div>Loading...</div>
  console.log("renderagain")
  const { status, txt, isRead, isDescending, isBySubject } = filterBy
  return (
    <section className="email-index">
      {(searchParams.get('compose') != null) && <EmailCompose onAddEmail={onAddEmail} folder={folder}  />}
      {/* <Link to={`/email/${folder}/compose`}><button>Compose</button></Link> */}
      <button id="compose" value={'new'} name="compose" onClick={onCompose}>Compose</button>
      <EmailFolderList folders={folders} filterBy={{ status }} onSetFilter={onSetFilter} />
      {emails.length === 0 && folder === 'draft' ? (
        <div>Loading...</div>
      ) : (
        !emailId && <div>
          <EmailFilter filterBy={{ txt, isRead, isDescending, isBySubject }} onSetFilter={onSetFilter} />
          <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
        </div>)}
      <Outlet context={{ test: "yuval", folders, onSetFilter, folder: folder, onRemoveEmail }} />
    </section>
  )
} 