import { useNavigate, useParams, useOutletContext, useSearchParams  } from "react-router-dom"
import { useEffect, useState} from "react"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function EmailDetails({ }) {
    const [email, setemail] = useState(null)
    const params = useParams()
    const [searchParams,setSearchParams] = useSearchParams() 
    const navigate = useNavigate()
    const { onReadMail } = useOutletContext()

    useEffect(() => {

        LoadEmail(params)
        SetRead(params)

    }, [])

    async function LoadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setemail(email)

        } catch (error) {
            navigate('email')
            console.log('Had issues loading email', error)

        }
    }

    async function SetRead() {
        console.log(params)
        try {
            const email = await emailService.getById(params.emailId)            
            if (email.to === emailService.getLoggedinUser().email && !email.isRead) {
                email.isRead = true;
                onReadMail(-1)
            }
            emailService.save(email)

        } catch (error) {
            console.log(error)
        }
    }

    function onBack() {
        navigate(`/email/${params.folder}?${searchParams}`)
    }

    async function onRemove() {
        try {
            await emailService.remove(params.emailId)
            showSuccessMsg('The email was successfully removed')
            navigate(`/email/${params.folder}?${searchParams}`)

        } catch (error) {
            showErrorMsg('Failed to remove the email. Please try again')
            console.log('Had issues delete email', err);
        }
    }


    console.log('Render');
    if (!email) return <div>Loading...</div>

    return (
        <section className="email-details">

            <p>
                {email.body}
            </p>
            <button onClick={onBack}>Back</button>
            <button onClick={onRemove}>X</button>

        </section>)

}