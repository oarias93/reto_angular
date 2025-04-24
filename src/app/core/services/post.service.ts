import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Singleton en toda la app
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {} // Inyección de HttpClient

  // Trae todos los posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  // Trae un post por su id
  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      catchError(this.handleError<Post>(`getPostById id=${id}`))
    );
  }

  //Manejo de errores
  // El método handleError maneja errores de las peticiones HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error('Error al cargar los datos. Inténtalo de nuevo.'));
    };
  }

}
