import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: string, fields: string[]): any[] {
    if (!items || !search) return items;
    const q = search.toLowerCase();
    return items.filter(item =>
      fields.some(f => (item[f] || '').toString().toLowerCase().includes(q))
    );
  }
}
