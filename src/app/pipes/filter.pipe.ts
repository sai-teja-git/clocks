import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "textFilter" })
export class TextFilterPipe implements PipeTransform {
    transform(array: string[], searchText = "") {
        if (!array) return [];
        if (!searchText) return array;

        return array.filter(e => e.toLowerCase().includes(searchText.toLowerCase()))
    }
}