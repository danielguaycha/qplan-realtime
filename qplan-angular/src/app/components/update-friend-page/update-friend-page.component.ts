import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

import {ApiService} from "../../services/api.service";
import {IFriend} from "../../entities/friend.interface";
import {MatIcon} from "@angular/material/icon";

@Component({
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatButton, ReactiveFormsModule, MatIcon, MatIconButton, RouterLink],
  templateUrl: './update-friend-page.component.html'
})
export class UpdateFriendPageComponent implements OnInit {

  public formFriend: FormGroup;
  public updateLoader = signal(false);
  private readonly friendId: string | null;
  private friend = signal<IFriend | null>(null);

  constructor(route: ActivatedRoute,
              private api: ApiService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.friendId = route.snapshot.paramMap.get('id');
    this.formFriend = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._getFriend();
  }

  public updateFriend(): void {
    const name = this.formFriend.get('name');
    const gender = this.formFriend.get('gender');

    if (!this.friendId || !name?.value || !gender?.value) {
      return;
    }
    this.updateLoader.set(true);
    this.api.updateFriend(this.friendId, name.value, gender.value).subscribe({
      next: (friend: IFriend) => {
        this._snackBar.open(`Success Update **${friend.name} with gender ${friend.gender}**`, 'Done');
      },
      error: (err) => this._snackBar.open(`Error on Update:: ${err.message}`),
      complete: () => this.updateLoader.set(false)
    });
  }

  private _getFriend(): void {
    if (!this.friendId) {
      return;
    }
    this.api.getFriendById(this.friendId).subscribe((f) => {
      if (!f) {
        this._snackBar.open(`Error friend dont exists`, 'Done');
        this.router.navigate(['/friends']).then();
        return;
      }
      this.friend.set(f);
      this.formFriend.get('name')?.setValue(f.name);
      this.formFriend.get('gender')?.setValue(f.gender);
    });
  }

}
