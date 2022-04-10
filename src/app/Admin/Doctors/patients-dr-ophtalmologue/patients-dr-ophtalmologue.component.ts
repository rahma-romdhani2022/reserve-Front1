import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DialogDetailsComponent } from './dialog-details/dialog-details.component';



export interface Doctor {
  id: number;
  image:string ;
  nom: string;
  prenom:string;
  email: string;
  numero: string;
  date:string;
}
@Component({
  selector: 'app-patients-dr-ophtalmologue',
  templateUrl: './patients-dr-ophtalmologue.component.html',
  styleUrls: ['./patients-dr-ophtalmologue.component.css']
})

export class PatientsDrOphtalmologueComponent implements OnInit {

  constructor(public dialog: MatDialog , private service : AdminService , private router : Router ) {}

  openDialog() {
    this.dialog.open(DialogDetailsComponent
      , {width:'5px' , height:'5px'});
    
  }

  ngOnInit() {
    

  }

  images:string[]=[
    './assets/imagesD/faces/face1.jpg',
    './assets/imagesD/faces/face10.jpg',
    './assets/imagesD/faces/face14.jpg',
    './assets/imagesD/faces/face15.jpg',
    './assets/imagesD/faces/face16.jpg',
    './assets/imagesD/faces/face19.jpg',
    './assets/imagesD/faces/face21.jpg',
    './assets/imagesD/faces/face23.jpg',
    './assets/imagesD/faces/face1.jpg',
   ]
    doctors : Doctor[]=[
      {id:1 ,image:this.images[1], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:2 ,image:this.images[2], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:3 ,image:this.images[3], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:4, image:this.images[4], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:5,image:this.images[5], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:6,image:this.images[6], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},

   ]
   delete(){
 
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "de supprimer patient : Rahma Romdhani !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Supprimé !',
            'Patient a été supprimé.',
            'success'
          )
        }
      })
    }
    details(){
      Swal.fire({
        background: '#1A202E',
        title: 'Nombre des consulultations : 3',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        
      })
  }
  logout() {
    localStorage.removeItem('nameAdmin');
    localStorage.removeItem('role');
    localStorage.removeItem('emailAdmin');
    localStorage.removeItem('idAdmin');
    this.service.islogin = false;
    this.router.navigate(['']);
    window.localStorage.clear();
      //location.reload();
  }
}

