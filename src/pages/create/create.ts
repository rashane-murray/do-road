import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class Create {

// variables linked to input fields
  fName: string;
  lName: string;
  pass: string;
  email: string;
  number: string;
  govID: string;

// variables for colour of text of labels of input fields
  fCol: string;
  lCol: string;
  pCol: string;
  eCol: string;
  nCol: string;
  iCol: string;

  missing: number[] = [];

  errorTitle: string = "SignUp Could Not Be Completed!"



  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  createUser(){
  

    if (this.check()){

      console.log('Worked');
      this.iCol = '#999';
    }
    else{
      this.mark();
      let a = this.alertCtrl.create({
        title: this.errorTitle,
        subTitle: "Please fill in highlighted fields",
        cssClass: 'alertStyle'
        });
        a.present();
    }


    }


    check(){
      this.fix();
      if (!this.fName)
        this.missing.push(1);
      if (!this.lName)
        this.missing.push(2);
      if (!this.pass)
        this.missing.push(3);
      if(!this.email)
        this.missing.push(4);
      if(!this.number)
        this.missing.push(5);
      if(!this.govID)
        this.missing.push(6);
      console.log(this.missing);
      if(this.missing.length==0)
        return true;
      else
        return false;

    }

    mark(){
      while(this.missing.length!=0)
      this.colored(this.missing.pop());

    }

    colored(n: number){
      if (n==1)
        this.fCol = '#f53d3d';
      else if (n==2)
        this.lCol = '#f53d3d';
      else if (n==3)
        this.pCol = '#f53d3d';
      else if (n==4)
        this.eCol = '#f53d3d';
      else if (n==5)
        this.nCol = '#f53d3d';
      else if (n==6)
        this.iCol = '#f53d3d';

    }

    fix(){
      this.fCol = '#999';
      this.lCol = '#999';
      this.pCol = '#999';
      this.eCol = '#999';
      this.nCol = '#999';
      this.iCol = '#999';
    }








}
