import { Component, VERSION, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(){
    this.formInit();
  }

  submitForm(){
    if(this.form.valid){
      let obj = this.form.value;
      return new Data(this.form.value.name, this.form.value.password);
    }
  }

  formInit(){
    this.form = this.fb.group({
      name: new FormControl('', Validators.required, [this.nLength]),
      password: new FormControl('', Validators.required, [this.pLength.bind(this)]),
    })

    this.form.patchValue({name:"Thamarai", password:"12345"});
  }

  async nLength(control: FormControl): Promise<any>{
    return await new Promise(res =>{
      setTimeout(()=>{
        if(control.value == "thams"){
          res({restrict: true});
        }else{
          res(null);
        }
      },5000);
    });
  }

  pLength(control: FormControl){
    if(control.value.length < 3){
      return { restrict: true };
    }else{
      return { restrict: false };
    }
  }

} 

class Data{
  userName: string;
  password: string;

  constructor(
    userName: string,
    password: string,
  ){
    this.userName = userName;
    this.password = password;
    console.log("userName " +this.userName);
    console.log("password " +this.password);
  }
}
