import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogConfig , MatDialogRef} from "@angular/material";
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AllDoctorsComponent } from '../all-doctors/all-doctors.component';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  experts : any ; 
fileData: File = null;
 url : FileReader ;
 selectedFile: File;
 imagePath1 : any ;
 uploadImageData : any ;
 expert : any ; 
 idExpertAjouterActuellement : number ; 
 test : any ;
 constructor(private dialog: MatDialog , private dialogRef : MatDialogRef<AddDoctorComponent> ,private service :AdminService , private userService : UserServiceService ,  private router : Router ) {}

  ngOnInit() {
    this.imagePath1="./assets/imagesD/faces/user.jpg" ;
   /***********************  checkbox de eye de password 1 ************/
  $(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
   /***********************  checkbox de eye de password  2 ************/
  $(".toggle-password2").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
 
}

onSelectFile(event ) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    this.selectedFile = event.target.files[0];
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.imagePath1 = reader.result;
    }
  }
}
  
  registre(fl: NgForm){
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile);
    this.expert ={
      "email": fl.value.email,
      "username": fl.value.nom,
      "password": fl.value.pwd,
      "role" : "Expert",
      "gender":fl.value.gender,
      "telephone":fl.value.telephone,
     // "image":this.uploadImageData,     
}
if (fl.value.pwd==fl.value.pwdc){ 
  console.log(this.expert)
  console.log(localStorage.getItem('idAdmin'))
  console.log(fl.value.nom)
  this.uploadImageData = new FormData();
  this.uploadImageData.append('imageFile', this.selectedFile);
  console.log(this.uploadImageData)    
    this.service.AddExpertAvecAdmin(parseInt(localStorage.getItem('idAdmin'))  ,  this.expert ).
    subscribe( data => {
      this.idExpertAjouterActuellement = data ; 
      console.log( this.idExpertAjouterActuellement);
      this.service.updateImageExpert( this.idExpertAjouterActuellement , this.uploadImageData).subscribe();
      console.log(this.expert)
      console.log(localStorage.getItem('idAdmin'))
      console.log(this.uploadImageData )
      console.log(fl.value.nom)
      this.onClear();
     // this.getAllDrsExperts() ; 
     this.router.navigate(['/All-Doctors']);
    } 
    ,err=>{
  
    alert(" il yaa probleme !!!!");
    //this.invalidLogin = true
    }
 )}
 else{
   alert("verifier le mot de passe ") ; 
 
this.test=true;}
}
 getAllDrsExperts(){
      this.service.getAllExperts("expert").subscribe(data=>{
        this.experts=data;
      });
    }
  onClear(){

 /*autre code */

    this.onClose11();
 }
 onClose11(){
   this.dialogRef.close();
 }
}