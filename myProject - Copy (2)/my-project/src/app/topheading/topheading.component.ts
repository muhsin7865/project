import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Blogpost } from '../model/blogpost';
import { ApiserviceService } from '../service/apiservice.service';
@Component({
  selector: 'app-topheading',
  templateUrl: './topheading.component.html',
  styleUrls: ['./topheading.component.css']
})
export class TopheadingComponent implements OnInit {

  blogPostDetail !: FormGroup;
  blogPostObj: Blogpost = new Blogpost();
  blogPostList: Blogpost[] = [];
  commentsList: any[];
  constructor(private formBuilder: FormBuilder, private m_service: ApiserviceService) { }
  ngOnInit(): void {
    this.getAllBlogPost();

    this.blogPostDetail = this.formBuilder.group({
      id: [''],
      title: [''],
      body: ['']
    });
  }

  getAllBlogPost() {
    this.m_service.getAllBlogPosts().subscribe(res => {
      this.blogPostList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }
  readMoreClick(post: Blogpost){
    debugger;
    this.blogPostDetail.controls['id'].setValue(post.id);
    this.blogPostDetail.controls['title'].setValue(post.title);
    this.blogPostDetail.controls['body'].setValue(post.body);
    let id = post.id;
    this.ReadMoreClick(id);
  }

  ReadMoreClick(id: string) {
    this.m_service.LoadComments(id).subscribe(res => {
      // console.log(res);
      this.commentsList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }
  searchButtonClick(){
    let id = document.getElementById("searchInput") as HTMLInputElement;
    this.m_service.searchBlogPost(id.value).subscribe(res => {
      this.blogPostList = Array(Object(res));
    }, err => {
      alert("No Posts Found with that Id!")
    });
  }
}
