import { Component, ElementRef,  ViewChild,  OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export class RuletaComponent {
  giros=0; 
  vueltas = 1;
  valor:any;
  @ViewChild('ruleta') ruleta!:ElementRef;
  @ViewChild('audio') audio!:ElementRef;
  @ViewChild('audio2') audio2!:ElementRef


  girar(){

    if (this.giros < this.vueltas) {

     let rand = Math.random()*7200;
     this.calcular(rand);
     this.giros++;     
    this.audio.nativeElement.play();

   
   }

  }

  premio(premios:any){  

    if (premios !== 'PERDISTE') {
      Swal.fire({
        imageUrl:'../../assets/image/feliz.jpg',
        title:`Usted Gano ${premios}`,
        confirmButtonText:'Aceptar',
        confirmButtonColor:'#0f3dd5',
        allowOutsideClick: false
      }).then((result)=>{
        if (result.value) {
          this.giros= 0;
          location.reload();         
        }
      })
    }else{

      Swal.fire({
        imageUrl:'../../assets/image/llorando.png',
        title:'Lo sentimos PERDISTE',
        confirmButtonText:'Aceptar',
        confirmButtonColor:'#e70b35',
        allowOutsideClick: false
      }).then((result)=>{
        if (result.value) {
          
          
          this.giros= 0;
          location.reload();
        }
      })    
   
      this.audio2.nativeElement.play();

    }

   }

   calcular(rand:any){

    this.valor = rand / 360;
    
    this.valor = (this.valor - parseInt(this.valor.toString().split('.')[0])) *360;

    this.ruleta.nativeElement.style.transform = `rotate(${rand}deg)`;

    setTimeout(() => {

      switch (true) {
        case this.valor > 0 && this.valor <= 45:
          this.premio("4 FICHAS")
          break;
        case this.valor > 45 && this.valor <= 90:
          this.premio("UN TIRO EXTRA")
          break;
        case this.valor > 90 && this.valor <= 135:
           this.premio("3 FICHAS")
          break;  
        case this.valor > 135 && this.valor <= 180:
           this.premio("UN TIRO EXTRA")
          break;
        case this.valor > 180 && this.valor <= 225 :
          this.premio("2 FICHAS")
          break;     
        case this.valor > 225 && this.valor <= 270:
          this.premio("PERDISTE")
          break;   
        case this.valor > 270 && this.valor <= 315:
          this.premio("UN TIRO EXTRA")
         break;      
        case this.valor > 315 && this.valor <= 360:
          this.premio("PERDISTE")
         break;   
      }

    },5000);

  }
}
