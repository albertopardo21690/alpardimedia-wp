import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../core/services/projects';

@Pipe({ name: 'statusCount', standalone: true })
export class StatusCountPipe implements PipeTransform {
  transform(projects: Project[], status: string): number {
    return projects.filter(p => p.status === status).length;
  }
}
