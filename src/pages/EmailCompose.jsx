
import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service"
import { Link, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";



export function EmailCompose({ onAddEmail, folder, onDratEmail, onReadMail }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [email, setEmail] = useState(emailService.createEmail())
    // const [email, setEmail] = useState(emailService.createEmail((searchParams.get('subject')), '', false, false, '', '', '',(searchParams.get('to'))))    
    const params = useParams()
    const navigate = useNavigate()
    // Ref to store the timeout ID
    const timeoutIdRef = useRef(null);

    const SignupSchema = Yup.object().shape({
        body: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        subject: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        to: Yup.string().email('Invalid email').required('Required'),
    })



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

    async function onSaveEmail() {
            email.sentAt = Date.now()
            if (email.to != emailService.getLoggedinUser().email) {
                email.isRead = true
            }
            else {
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

    // CustomInput component
    function CustomInput({ label, value, ...props }) {
        const [field, meta] = useField(props)
        return (
            <div>
                <TextField
                    {...field}
                    {...props}
                    id="outlined-basic"
                    label={label}
                    value={value} 
                    variant="outlined"
                    onChange={(e) => {
                        field.onChange(e);
                        handleChange(e)
                    }}
                />
                {meta.touched && meta.error && <div>{meta.error}</div>}
            </div>
        )
    }

    function handleClose() {
        navigate(params.emailId ? `/email/${folder}/${params.emailId}` : `/email/${folder}`)
    }
    const { subject, body, to } = email
    const title = searchParams.get('compose') === 'new'


    return (
        <div className="email-compose">
            <h1> {title ? 'New Message' : 'Edit Mesage'}</h1>
            <Formik
                initialValues={{
                    to: to || '',
                    subject: subject || '',
                    body:  body || '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values)
                    onSaveEmail()                
                }}  >
                {({ errors, touched }) => (
                    // <form className="email-compose" onSubmit={onSaveEmail}>
                   
                    <Form>
                        <Field as={CustomInput} value={to} name="to" label="to" type="email" />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                        <Field as={CustomInput} CustomInput value={subject} name="subject" label="subject" />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                        <Field as={CustomInput} CustomInput value={body} name="body" label="body" />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                        <Button variant="contained" type="submit" id="send" value="send" name="send">Send</Button>
                        <Button variant="outlined" type="button" id="close" className="close-btn" value="close" name="close" onClick={handleClose}> X </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


