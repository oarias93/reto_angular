import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../../core/services/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Post } from '../../../core/models/post.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: PostService;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListComponent, HttpClientTestingModule],
      providers: [PostService]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    spyOn(postService, 'getPosts').and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.apiState.loading).toBeFalse();
  });

  it('should handle error when loading posts fails', () => {
    const errorMessage = 'Error loading posts';
    spyOn(postService, 'getPosts').and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    component.ngOnInit();

    expect(component.apiState.error).toBe(errorMessage);
    expect(component.apiState.loading).toBeFalse();
    expect(component.posts).toEqual([]);
  });

  it('should track posts by id', () => {
    const post = { id: 1 } as Post;
    expect(component.trackByPostId(0, post)).toBe(1);
  });

  it('should display loading state', () => {
    component.apiState = { loading: true, error: '' };
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading-state');
    expect(loadingElement).toBeTruthy();
  });

  it('should display error state', () => {
    component.apiState = { loading: false, error: 'Test Error' };
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error-state');
    expect(errorElement.textContent).toContain('Test Error');
  });
});
