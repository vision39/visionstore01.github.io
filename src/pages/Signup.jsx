import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../Styles/login.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../firebse.config';
import { storage } from '../firebse.config'
import { db } from '../firebse.config'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `image/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, files)
      const user = userCredential.user


      uploadTask.on((error) => {
        toast.error("error.meaasge")
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });

        });
      })

      setLoading(false)
      toast.success('Account created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Something Went Wrong');
    }
  }


  return <Helmet title='Signup'>
    <section>
      <Container>
        <Row>
          {
            loading? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading...</h5></Col> : <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Signup</h3>


            <Form className='auth_form' onSubmit={signup}>
              <FormGroup className='form_group'>
                <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              </FormGroup>
              <FormGroup className='form_group'>
                <input type="email" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup className='form_group'>
                <input type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} />
              </FormGroup>
              <FormGroup className='form_group'>
                <input type="file" onChange={e => setFiles(e.target.files[0])} />
              </FormGroup>

              <button type='submit' className="buy_btn auth_btn">Create an account</button>
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </Form>
          </Col>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Signup