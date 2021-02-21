import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { LoggerService } from './logger.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService,
    private http: HttpClient) { }

    getAuthorRecommendation(readerID: number): Promise<string> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(readerID > 0) {
            resolve('Dr.Seuss');
          } else {
            reject('Invalid reader ID');
          }
        }, 2000);
      });
    }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers')
    .pipe(
      catchError(this.handleError)
    );
    // return this.http.get<Reader[]>('/api/errors/500')
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
}
