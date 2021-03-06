import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.asdasd
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading
  registerCredentials = { email: '', password: '' }

  constructor(
    private navCtrl: NavController, 
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  createAccount() {
    this.navCtrl.push('RegisterPage')
  }

  login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe( allowed => {
        allowed ? this.navCtrl.setRoot('HomePage') : this.showError('Access Denied')
      },
      error => {
        this.showError(error)
      }
    )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    })
    this.loading.present()
  }

  showError(text) {
    this.loading.dismiss()

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    })
    alert.present(prompt)
  }

}
