import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-historique-avis',
  templateUrl: './historique-avis.component.html',
  styleUrls: ['./historique-avis.component.css']
})
export class HistoriqueAvisComponent implements OnInit {

  constructor(private router : Router, private service : UserServiceService) { }
  ngOnInit() {
    $( "#menu" ).on( "click", function()
{
  $( "#menu23" ).fadeToggle( "fast" );
});
  }
  logout() {
    localStorage.removeItem('name');
    this.service.islogin = false;
  this.router.navigate(['']);
      ///location.reload();
  }
}
