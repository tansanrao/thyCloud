import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../environments/environment';
import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  Injectable
} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {AuthService, UserDetails, TokenPayload} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['etag', 'name', 'size', 'lastModified'];
  dataSource = new FileDataSource(this.http, this.auth);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  details: UserDetails;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        console.log(this.details);
      },
      err => {
        console.error(err);
      }
    );
    // this.downloadlink("Moun_Kernel_V6.2_-_TissotTreble.zip");
  }

  downloadlink(filename) {
    this.http
      .get<Url>(environment.apiUrl + `v1/getDownloadUrl?name=${filename}`, {
        headers: {Authorization: `Bearer ${this.auth.getToken()}`}
      })
      .subscribe(res => {
        console.log(res.url);
        window.location.href = res.url;
      });
  }
}

export class FileDataSource extends DataSource<any> {
  constructor(private http: HttpClient, private auth: AuthService) {
    super();
  }

  connect(): Observable<FileData[]> {
    return this.http.get<FileData[]>(environment.apiUrl + `v1/getFiles`, {
      headers: {Authorization: `Bearer ${this.auth.getToken()}`}
    });
  }

  disconnect() {
  }
}

export interface FileData {
  etag: string;
  name: string;
  size: number;
  lastModified: string;
}

export interface Url {
  url: string;
}
