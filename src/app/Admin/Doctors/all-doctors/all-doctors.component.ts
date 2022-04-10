import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import{MatDialog , MatDialogConfig} from '@angular/material'
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import Swal from 'sweetalert2/dist/sweetalert2.min.js'
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modele/user';
import { DatePipe } from '@angular/common';
import { UserServiceService } from 'src/app/services/user-service.service';
import { parse } from 'path';


export interface Doctor {
  id: number;
  image:string ;
  name: string;
  email: string;
  numero: string;
  adresse:string ;
  date:string;
 
}


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent   implements OnInit {
  constructor(public dialog: MatDialog , private service : AdminService , private expertService : UserServiceService , 
    private router :Router , private datePipe: DatePipe , private ar: ActivatedRoute) {}
   searche="";
  tab : Doctor[];
  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical";
  experts :any;
  image1="./assets/imagesD/faces/user.jpg";
  bouton : boolean ; 
  ngOnInit(){
    this.getAllDrsExperts();
    this.ar.paramMap.subscribe((x)=>{
      this.id =+ x.get('id');
  }) ; 
     
   /*this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      this.user=data
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
            this.retrieveResponse = this.user;
            this.base64Data = this.retrieveResponse.image;
            this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
    
  }) ;
*/
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      this.test=res ; 
      console.log(this.test.role);
      if(this.test.role === "Admin Medical Manager"){
        this.bouton= true ;
        console.log(this.bouton) 
       this.username = localStorage.getItem("nameAdmin");
       console.log(parseInt(localStorage.getItem('idAdmin')))
       console.log(localStorage.getItem("nameAdmin"))
       this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
         this.admin=data
               if(this.admin.image ==null){
                 this.imagePath="./assets/imagesD/faces/user.jpg"
               }
               else{
               this.retrieveResponse = this.admin;
               this.base64Data = this.retrieveResponse.image;
               this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
               console.log(this.imagePath)
               this.role=this.admin.role;  }) ;
      }
      else{
        if(this.test.role === "Admin Digital Manager"){
          this.bouton = false  ; 
          console.log(this.bouton)
         this.username = localStorage.getItem("nameAdmin");
         console.log(parseInt(localStorage.getItem('idAdmin')))
         console.log(localStorage.getItem("nameAdmin"))
         this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
           this.admin=data
                 if(this.admin.image ==null){
                   this.imagePath="./assets/imagesD/faces/user.jpg"
                 }
                 else{
                 this.retrieveResponse = this.admin;
                 this.base64Data = this.retrieveResponse.image;
                 this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
                 console.log(this.imagePath)
                 this.role=this.admin.role;  }) ;
        }
      }
     })
     this.service.getAllExperts("expert").subscribe(data=>{
        this.experts=data;
        //this.experts.date_inscription = this.datePipe.transform(this.experts.date_inscription, 'dd/MM/yyyy');
        console.log(this.experts.image)
     })
  }

 

  openDialog() {
    this.dialog.open(AddDoctorComponent, {
      width: '250px',

     } );
  
  }

  openDialog2(id : number) {
    this.dialog.open(EditDoctorComponent);
    localStorage.setItem("idExpertAModifier" , id.toString())
    console.log(localStorage.getItem("idExpertAModifier"))
  }
  
 
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
  rechercheA(){
 
   
  this.tab= this.filtrerA(this.searche)}
  
  filtrerA(sousChaine:string){
 
  return this.experts.filter((liste)=>
  liste.adresse.toLowerCase().includes(this.searche.toLowerCase()))
  
  }
  
  supprimer(id :number){
    let confirm = window.confirm("Est vous sùre de supprimer  ce Dr ophtalmologue   definiivement !!?") ; 
    
    if (confirm==true){
  
      
    this.expertService.deleteExperts(id).subscribe(()=>{this.getAllDrsExperts()
      console.log("ok")
      }
      );   
    }
    }
    getAllDrsExperts(){
      this.service.getAllExperts("expert").subscribe(data=>{
        this.experts=data;
      });
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