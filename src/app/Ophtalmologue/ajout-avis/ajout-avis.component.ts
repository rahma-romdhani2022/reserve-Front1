import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-ajout-avis',
  templateUrl: './ajout-avis.component.html',
  styleUrls: ['./ajout-avis.component.css']
})
export class AjoutAvisComponent implements OnInit {
  formGroup1: FormGroup;
  formGroup2: FormGroup;
   isLinear = false;

  constructor(private _formBuilder: FormBuilder , private route : Router , private service : UserServiceService) {}

  ngOnInit() {
    // mtaa dropdown 
    $( "#menu" ).on( "click", function()
    {
      $( "#menu23" ).fadeToggle( "fast" );
    });
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  confimerOperation(){
    Swal.fire({
     
      icon: 'success',
      title: 'Votre avis a  bien ajouter',
      showConfirmButton: false,
      timer: 2000
    })
    this.route.navigate(['/accueil'])
  }
   logout() {
    localStorage.removeItem('name');
    this.service.islogin = false;
  this.route.navigate(['']);
      ///location.reload();
  }
}