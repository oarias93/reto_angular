import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  apiState = {
    loading: true,
    error: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Asegúrate que coincide con la prueba
    this.apiState = { loading: true, error: '' };

    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.apiState = { loading: false, error: '' };
      },
      error: (err) => {
        this.apiState = { loading: false, error: err.message };
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}
