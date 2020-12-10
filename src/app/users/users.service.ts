import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, map, mergeMap } from "rxjs/operators";
import { User } from "./user";
import { API_DELAY, USERS_STORE_NAME } from "./const";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Injectable()
export class UsersService {
  constructor(private dbService: NgxIndexedDBService) {}

  createUser(user: User): Observable<number> {
    const { id, ...userToCreate } = user;
    return this.dbService
      .add(USERS_STORE_NAME, userToCreate)
      .pipe(delay(API_DELAY));
  }

  getUser(userId: number): Observable<User> {
    return this.dbService.getByKey(USERS_STORE_NAME, userId).pipe(
      delay(API_DELAY),
      mergeMap(user => (user ? of(user) : throwError("User not found")))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.dbService.update("users", user).pipe(
      map(users => users[0]),
      delay(API_DELAY)
    );
  }

  getUsers(): Observable<User[]> {
    return this.dbService.getAll(USERS_STORE_NAME).pipe(delay(API_DELAY));
  }
}
