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

import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword }  from '../../store/auth'
import { useMemo } from 'react';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] ) ;

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const onSubmit = ( event ) => { 
    event.preventDefault();
    //! No es esta la acción a despachar, en LoginPage se tiene que despachar de nuestro thunks que es startLoginWithEmailPassword
    dispatch( startLoginWithEmailPassword({email, password}) )
   }

  const onGoogleSignIn = () => { 

    dispatch( startGoogleSignIn({ email, password }) );
   }

  return (
    <AuthLayout title='Login' >
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid2 container spacing={2}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
 
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
 
            <Grid2 container size={12} spacing={2}>

              <Grid2 
                display={!!errorMessage ? '' : 'none'}  
                sx={{ width: '100%' }}
              >
                <Alert 
                  severity="error"
                >
                  {errorMessage}
                </Alert>
              </Grid2>

              <Grid2 size={{ xs: 12, md: 6 }}>
                <Button disabled={ isCheckingAuthentication } type='submit' variant="contained" fullWidth>
                  Login
                </Button>
              </Grid2>
 
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Button disabled={ isCheckingAuthentication } onClick={ onGoogleSignIn } fullWidth variant="contained">
                  <Google />
                  <Typography marginLeft={1}>Google</Typography>
                </Button>
              </Grid2>
            </Grid2>
            
            <Grid2 container direction="row" justifyContent="end" size={12}>
              <Link color="inherit" component={RouterLink} to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid2>

          </Grid2>

        </form>
    </AuthLayout>
 
      
  );
}