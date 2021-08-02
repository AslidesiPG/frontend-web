import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toParams } from '@utils';
import { IPagination, Project, GetProjectRequest, ProjectBookmark, GetProjectsRequest } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient,
  ) { }

  getProjects(request?: GetProjectsRequest) {
    return this.http.get<IPagination<Project>>(`project`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getProject(id: string, request?: GetProjectRequest) {
    return this.http.get<Project>(`project/${id}`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  getMyProjects(request?: GetProjectRequest) {
    return this.http.get<Project>(`project/me`, {
      params: request ? toParams(request) : {},
    }).toPromise();
  }

  addProject(request: Project) {
    return this.http.post<ProjectBookmark>(`project`, request).toPromise();
  }

  updateProject(id: string, request: Project) {
    return this.http.put<ProjectBookmark>(`project/${id}`, request).toPromise();
  }

  deleteProject(id: string) {
    return this.http.delete<ProjectBookmark>(`project/${id}`, {}).toPromise();
  }

  getBookarkedProjects(request?: GetProjectRequest) {
    return this.http.get<Project>(`project/bookmark`, {
      params: toParams(request)
    }).toPromise();
  }

  toggleBookmark(project) {
    if (!project.isBookmarked) {
      return this.addBookmark(project.id).then((resp) => {
        project.isBookmarked = true;
        if (project) {
          project.bookmarkCount++;
        }
        return resp;
      });
    } else {
      return this.deleteBookmark(project.id).then((resp) => {
        if (project) {
          project.bookmarkCount--;
        }
        project.isBookmarked = false;
        return resp;
      })
    }
  }
  
  addBookmark(id: string) {
    return this.http.post<ProjectBookmark>(`project/bookmark/${id}`, {}).toPromise();
  }
  deleteBookmark(id: string) {
    return this.http.delete<ProjectBookmark>(`project/bookmark/${id}`, {}).toPromise();
  }
}
