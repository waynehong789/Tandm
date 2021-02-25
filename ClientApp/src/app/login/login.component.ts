import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { clearToken, setToken } from '../store/actions';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  constructor(
    private store: Store<any>,
    private appService: AppService,
    public http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(clearToken());
  }

  login(userName: string, password: string) {
      this.appService.login(userName, password)
      .subscribe(
        (result) => {
          console.log(result);
          this.store.dispatch(setToken({username: result.username, token: result.token}));
          this.router.navigate(['/calculator']);
        },
        (error) => console.error(error)
      );
  }
}
