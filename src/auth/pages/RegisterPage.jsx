import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid2,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @.'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}
 
export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] ) ;

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm(formData, formValidations);

  
  const onSubmit = ( event ) => { 
    event.preventDefault()
    setFormSubmitted(true)

    if ( !isFormValid ) return;
    
    dispatch( startCreatingUserWithEmailPassword(formState) );
  
  }

  return (
    <AuthLayout title='Crear cuenta' >
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid2 container spacing={2}>
            <TextField
              fullWidth
              autocomplete="username"
              id="name"
              label="Nombre completo"
              placeholder="Nombre completo"
              type="text"
              variant="outlined"
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />

            <TextField
              fullWidth
              id="email"
              label="Email"
              placeholder="correo@google.com"
              type="email"
              variant="outlined"
              autoComplete="email"
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted}
              helperText={ emailValid }
            />
            <TextField
 
              fullWidth
              id="password"
              label="Password"
              placeholder="password"
              type="password"
              variant="outlined"
              autocomplete="current-password"              
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted}
              helperText={ passwordValid }
            />
 
            <Grid2 container size={12} spacing={2}>
              <Grid2 
                size={{ xs: 12 }}
                display={ !!errorMessage ? '' : 'none'}  
              >
                <Alert severity='error' >
                  {errorMessage}
                </Alert>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Button 
                  type='submit' 
                  fullWidth 
                  variant="contained"
                  disabled={ isCheckingAuthentication }
                >
                  Crear cuenta
                </Button>
              </Grid2>
            </Grid2>
            
            <Grid2 container direction="row" justifyContent="end" size={12}>
              <Typography size={{ mr: 1 }} >¿Ya tienes cuenta?</Typography>
              <Link color="inherit" component={RouterLink} to="/auth/login">
                ingresar
              </Link>
            </Grid2>

          </Grid2>

        </form>
    </AuthLayout>
  );
}