
import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service"
import { Link, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"

export function EmailCompose({ onAddEmail, folder, onDratEmail, onReadMail }) {
    const [email, setEmail] = useState(emailService.createEmail())
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()    
    const navigate = useNavigate()
    // Ref to store the timeout ID
    const timeoutIdRef = useRef(null);    

    useEffect(() => {        
        if (searchParams.get('compose') && searchParams.get('compose') != 'new') {
            loadEmail()
        }

        return () => clearTimeout(timeoutIdRef.current);
    }, [])

    async function loadEmail() {
        try {
            const emailTosave = await emailService.getById(searchParams.get('compose'))
            setEmail(emailTosave)
        } catch (error) {
            console.log('loadEmail:Failed to get Email by Id', error)
        }
    }

    async function onSaveEmail(ev) {
        ev.preventDefault()
        email.sentAt = Date.now()        
        if (email.to != emailService.getLoggedinUser().email) {
            email.isRead = true            
        }
        else
        {
            email.isRead = false
            onReadMail(1)            
        }
        try {
            await onAddEmail(email)                                                

            if (params.emailId) {
                navigate(`/email/${folder}/${params.emailId}`)
            }
            else {
                navigate(`/email/${folder}`)
            }
        } catch (error) {
            console.log('Had issues saving email', error);
        }
    }

    function onSaveDratEmail(draftEmail) {
        draftEmail.isRead = true
        if (clearTimeout) {
            clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(() => {
            onDratEmail(draftEmail);
        }, 5000)
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        const draftEmail = { ...email, [field]: value }
        onSaveDratEmail(draftEmail)
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }

    const { subject, body, from, to } = email
    return (
        <div className="email-compose">
            <h1>New Message</h1>

            <form onSubmit={onSaveEmail}>
                <label htmlFor="to">To</label>
                <input value={to} onChange={handleChange}
                    type="text" id="to" name="to" />

                <label htmlFor="from">From</label>
                <input value={from} onChange={handleChange}
                    type="text" id="from" name="from" />

                <label htmlFor="subject">Subject</label>
                <input value={subject} onChange={handleChange}
                    type="text" id="subject" name="subject" />

                <label htmlFor="body">Body</label>
                <input value={body} onChange={handleChange}
                    type="text" id="body" name="body" />
                <button>Send</button>
                <Link to={params.emailId ? `/email/${folder}/${params.emailId}` : `/email/${folder}`}><button className="close-btn">X </button></Link>

            </form>
        </div>
    )
}


