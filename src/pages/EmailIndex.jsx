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
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams, folder))  
  const [folders, setFolder] = useState(null)

  useEffect(() => {
    initSearchParams()
    filterBy.status = folder;
    LoadEmails()    
    LoadFolders()
  }, [filterBy, folder])

  function initSearchParams() {
     // Sanitize the filterBy object    
    let sanitizedFilterBy = {
      ...Object.fromEntries(
        Object.entries(filterBy).filter(([key, value]) => value !== '' && key !== 'status' && value !== 'null')
      ),
    };  
    const field = 'compose'
    const value = searchParams.get(field)
    if (value){
      sanitizedFilterBy= { ['compose']: value, ...sanitizedFilterBy } 
    }
    setSearchParams(sanitizedFilterBy)    
  }

  function onCompose(ev) {
    let { name: field, value } = ev.target
    const updatedSearchParams = { [field]: value, ...filterBy };
    // Sanitize the filterBy object
    const sanitizedFilterBy = {
      ...Object.fromEntries(
        Object.entries(updatedSearchParams).filter(([key, value]) => value !== '' && key !== 'status' && value !== 'null')),
    };    
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

  async function saveEmail(emailToSave) {
    try {
      const savedEmail = await emailService.save(emailToSave)  
      if (folder === 'sent' ||
        (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
        setEmails((prevEmails) => [savedEmail, ...prevEmails])
      }
      if (folder === 'draft' && !emailToSave.sentAt) {
        setEmails((prevEmails) => [savedEmail, ...prevEmails])
      }     
      if (emailToSave.sentAt){
        showSuccessMsg('The email was sent successfully.')  
      }
      else{                        
        const updatedSearchParams = { 'compose': savedEmail.id, ...filterBy };           
        setSearchParams(updatedSearchParams)          
        showSuccessMsg('Draft saved')
      }               
    } catch (error) {
      if (emailToSave.sentAt)
      {
        showErrorMsg('Failed to send the email. Please check your connection and try again')
      }else
      {
        showErrorMsg('Failed to save draft of the email. Please check your connection and try again')
      }      
      console.log('EmailIndex:saveEmail():Had issues saving email', error);
      
    }
  }
   
  async function updateEmail(emailtoAdd) {
    try {      
      let emailTosave = await emailService.getById(searchParams.get('compose'))
      emailTosave = { ...emailTosave, ...emailtoAdd}
      const savedEmail = await emailService.save(emailTosave)            
      if (folder === 'sent' ||
        (savedEmail.to === emailService.getLoggedinUser().email && folder === 'inbox')) {
        setEmails((prevEmails) => [savedEmail, ...prevEmails])
      }
      if (folder === 'draft') {
        if (!savedEmail.sentAt) {
          setEmails((prevEmails) =>
            prevEmails.map(email => (email.id === savedEmail.id) ? savedEmail : email))
        }
        else {
          setEmails((prevEmails) =>
            prevEmails.filter(email => email.id === savedEmail.id ? !savedEmail.sentAt : !email.sentAt))
        }
      }
      if (emailtoAdd.sentAt){
        showSuccessMsg('The email was sent successfully.')  
      }
      else{

        showSuccessMsg('Draft saved')
      }
    } catch (error) {
      if (emailtoAdd.sentAt)
      {
        showErrorMsg('Failed to send the email. Please check your connection and try again')
      }else
      {
        showErrorMsg('Failed to save draft of the email. Please check your connection and try again')
      }      
      console.log('EmailIndex:updateEmail():Had issues saving email', error);
    }
  }

  // Draft Email  
  function onDratEmail(emailToadd) {

    if (searchParams.get('compose') === 'new') {      
         saveEmail(emailToadd)
    }else
    {    // Draft
        updateEmail(emailToadd)
    }

    }
  
  // Send Email 
  function onAddEmail(emailToAdd) {
   
      // New email
      if (searchParams.get('compose') === 'new') {      
        saveEmail(emailToAdd)
      }
      else {  // Update    
        updateEmail(emailToAdd) 
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
      {(searchParams.get('compose') != null) && <EmailCompose onAddEmail={onAddEmail} folder={folder} onDratEmail={onDratEmail} />}
      {/* <Link to={`/email/${folder}/compose`}><button>Compose</button></Link> */}
      <button id="compose" value={'new'} name="compose" onClick={onCompose}>Compose</button>
      <EmailFolderList folders={folders}/>
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