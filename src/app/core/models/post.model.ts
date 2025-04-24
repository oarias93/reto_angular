export interface Post {
  userId: number;  // ID del usuario que creó el post
  id: number;     // ID único del post
  title: string;  // Título del post
  body: string;   // Contenido del post
}
