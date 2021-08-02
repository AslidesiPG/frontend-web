import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isEmpty } from '@utils';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
 

  ngOnInit(): void {
    this.authService
      .$user
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        if (isEmpty(user.profile_created_at)) {
          this.router.navigate(['/create-profile']);
        }
      });
  }

  ngOnDestroy(): void {}

}
