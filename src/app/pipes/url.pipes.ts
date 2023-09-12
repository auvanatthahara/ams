import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'url',
    standalone: true,
})
export class UrlPipe implements PipeTransform {

    transform(value: any) : string {
        return `http://localhost:8080/files/${value}`
    }

}