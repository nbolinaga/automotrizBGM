import { Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('leftAnimation', [
      transition(':enter', [
        style({ left: '-100%', opacity: '0' }, ),
        animate('.5s ease-out', style({ left: '50%', opacity: '1'}))
      ]),
      transition(':leave', [
        style({ left: '50%', opacity: '1' }),
        animate('.5s ease-in', style({ left: '-100%', opacity: '0'}))
      ])
    ]),
    trigger('rightAnimation', [
      transition(':enter', [
        style({ right: '-100%', opacity: '0' }, ),
        animate('.5s ease-out', style({ right: '50%', opacity: '1'}))
      ]),
      transition(':leave', [
        style({ right: '50%', opacity: '1' }),
        animate('.5s ease-in', style({ right: '-100%', opacity: '0'}))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  registrar = false;
  registroForm: FormGroup;
  loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private fb : FormBuilder,
    private router: Router){
  }

  ngOnInit(): void {
    this.crearForm1()
    this.crearForm2()
  }

  ingresarScreen(){
    this.registrar = false;
  }
  registrarScreen(){
    this.registrar = true;
  }
  Acceder(){
    this.authService.loginWithGoogle();
    if(this.authService.isAuthenticated){
      this.router.navigate(['/perfil']);
    }
  }

  // Funciones para el formulario

  crearForm1(): void {
    this.registroForm = this.fb.group({
      displayName: ['', Validators.required],
      tipoID: ['', Validators.required],
      id:  ['', Validators.required],
      tel:  ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    })
  }

  crearForm2(): void {
    this.loginForm = this.fb.group({
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      recordar:['']
    })
  }

  async enviarRegistro(){
    try{
      const formValues = {
        displayName: this.registroForm.get('displayName').value,
        tipoID: this.registroForm.get('tipoID').value,
        id: this.registroForm.get('id').value,
        tel: this.registroForm.get('tel').value,
        email: this.registroForm.get('email').value,
        password: this.registroForm.get('password').value,
        password2: this.registroForm.get('password2').value,
      };
      if(formValues.displayName !== ''){
        if(formValues.tipoID !== ''){
          if(Number(formValues.id)){
            if(Number(formValues.tel)){
              if(this.registroForm.get('email').valid){
                if(this.registroForm.get('password').valid){
                  if(formValues.password === formValues.password2){
                    const user = await this.authService.signUpWithEmail(formValues.displayName, formValues.email, formValues.password);
                    if(user){
                      this.router.navigate(['/perfil']);
                    }
                  }
                  else{
                    alert('La clave de confirmación no coincide con la original.')
                  }
                }
                else{
                  alert('La clave debe tener al menos 6 caracteres.')
                }
              }
              else{
                alert('El email ingresado no es valido.')
              }
            }
            else{
              alert('El telefono ingresado no es valido.');
            }
          }
          else{
            alert('No olvide ingresar su identificación');
          }
        }
        else{
          alert('Seleccione un tipo de identificación');
        }       
      }
      else{
        alert('No olvide ingresar su nombre.');
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async enviarIngreso(){
    try{
      const formValues = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
        recordar: this.loginForm.get('recordar').value
      };

      if(this.loginForm.get('email').valid){
        if(this.loginForm.get('password').valid){
          const user = await this.authService.loginWithEmail(formValues.email, formValues.password);
          if(user){
            this.router.navigate(['/perfil']);
          }
        }
        else{
          alert('La clave ingresada no es valida.')
        }
      }
      else{
        alert('El email ingresado no es valido.')
      }
    }
    catch(e){
      console.log(e)
    }
  }
}
