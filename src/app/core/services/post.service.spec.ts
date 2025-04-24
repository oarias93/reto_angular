import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;


  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Nueva forma
        provideHttpClientTesting(), // Nueva forma
        PostService,
      ],
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  // Verificación después de cada prueba
  afterEach(() => {
    httpMock.verify(); // Asegura que no hay peticiones HTTP pendientes
  });


  // Prueba 1: Obtener posts exitosamente
  it('should fetch posts successfully', () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test Post 1', body: 'Test Body 1' },
      { id: 2, userId: 1, title: 'Test Post 2', body: 'Test Body 2' },
    ];

    // Llamamos al método real
    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts); // Verificamos que los datos sean correctos
      expect(posts.length).toBe(2); // Verificamos la cantidad de posts
    });

    // Mockeamos la petición HTTP
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET'); // Verificamos que sea un GET

    // Simulamos una respuesta exitosa
    req.flush(mockPosts);
  });


  // Prueba 2: Manejo de errores al obtener posts
  it('should handle error when fetching posts', () => {
    const errorMessage = 'Error 500: Internal Server Error';

    // Llamamos al método y verificamos el error
    service.getPosts().subscribe({
      error: (err) => {
        expect(err.message).toContain('Error al cargar los datos'); // Mensaje personalizado
      },
    });

    const req = httpMock.expectOne(service['apiUrl']);

    // Simulamos un error del servidor
    req.flush(errorMessage, {
      status: 500,
      statusText: 'Server Error'
    });
  });


  // Prueba 3: Obtener un post por ID exitosamente
  it('should fetch a single post by ID', () => {
    const mockPost: Post = {
      id: 1,
      userId: 1,
      title: 'Test Post',
      body: 'Test Body'
    };

    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(mockPost); // Verificamos el post individual
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  // Prueba 4: Manejo de errores al obtener un post por ID
  it('should handle 404 error when fetching a post', () => {
    const errorMessage = 'Error 404: Not Found';

    service.getPostById(999).subscribe({
      error: (err) => {
        expect(err.message).toContain('Error al cargar los datos');
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/999`);
    req.flush(errorMessage, {
      status: 404,
      statusText: 'Not Found'
    });
  });

});
