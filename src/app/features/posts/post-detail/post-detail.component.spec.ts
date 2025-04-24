import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from '../../../core/services/post.service';
import { CommonModule } from '@angular/common';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', ['getPostById']);
    mockPostService.getPostById.and.returnValue(of({
      id: 1,
      userId: 1,
      title: 'Test Post',
      body: 'Test Body'
    }));

    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        PostDetailComponent,
        HttpClientTestingModule,
        CommonModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostService, useValue: mockPostService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post on init', () => {
    expect(mockPostService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toBeDefined();
    expect(component.apiState.loading).toBeFalse();
  });
});
