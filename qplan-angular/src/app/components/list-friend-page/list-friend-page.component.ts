import {Component, Inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {DOCUMENT} from "@angular/common";

import {webSocketService} from "../../services/websocket.service";
import {ApiService} from "../../services/api.service";
import {IFriend} from "../../entities/friend.interface";

@Component({
  selector: 'app-list-friend-page',
  standalone: true,
  imports: [MatTableModule, MatButton, RouterLink, MatIconButton, MatIcon],
  templateUrl: './list-friend-page.component.html'
})
export class ListFriendPageComponent implements OnInit, OnDestroy {

  friends = signal<IFriend[]>([]);

  constructor(private websocket: webSocketService,
              private api: ApiService,
              @Inject(DOCUMENT) private document: Document) {
    this.websocket.receiveStatus().subscribe(rs => {
      this._updateFriendListWith(rs as IFriend);
    });
  }

  ngOnInit(): void {
    this.websocket.connectSocket('hello');
    this._getAllFriends();
  }

  ngOnDestroy(): void {
    this.websocket.disconnectSocket();
  }

  private _getAllFriends(): void {
    this.api.getAllFriends().subscribe(f => {
      this.friends.set(f);
    });
  }

  private _updateFriendListWith(friend: IFriend): void {
    const updateFriends = this.friends().map((f) => {
      if (f.id === friend.id) {
        return friend;
      }
      return f;
    });
    this.friends.update(() => [...updateFriends]);
    setTimeout(() => this._markRowUpdated(friend.id));
  }

  private _markRowUpdated(friendId: string | number): void {
    const element = this.document.getElementById(`friend_${friendId}`);
    if (!element) {
      return;
    }
    element.classList.toggle('remarked');
    setTimeout(() => element.classList.remove('remarked'), 500);
  }
}
