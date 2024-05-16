import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class AppComponent implements OnInit{
  title = 'Riff_Project';
  profile: any;
  textMessage: any;
  testReturn : any;
  sever = "https://dc51-2405-9800-b640-9c0f-a059-10bc-690e-2f0d.ngrok-free.app";

  constructor() {
  }

  async ngOnInit() {

      await this.login()

  }

  async login() {

    console.log('liff.isLoggedIn()', liff.isLoggedIn());

    if (await !liff.isLoggedIn()) {
      liff.login();

    } else {
      console.log('loginแล้ว');

      this.profile = await liff.getProfile();
      console.log('this.profile', this.profile);

      console.log( liff.getOS());

    }
  }

  async testMessageingApi(type: string) {

    var that = this;

    axios.get( this.sever + '/messageing-api', {
        params: {
          type: type,
          message: 'test ' + type,
          userId : this.profile.userId,
          name : this.profile.displayName
        }
      })
      .then(function (response) {
        console.log(response);
        that.testReturn = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  sendMessage(){
    console.log('sendMessage', this.textMessage);
    var that = this;

    axios.get( this.sever + '/message', {
        params: {
          message: this.textMessage
        }
      })
      .then(function (response) {
        console.log(response);
        that.testReturn = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  logout(){
      console.log('logout');
      liff.logout()
      window.location.reload();

  }


}
