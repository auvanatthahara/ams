import { Component, OnInit } from '@angular/core';
import { ProviderResDto } from '../../../dto/provider/provider.res.dto';
import { ProviderService } from '../../../services/provider.service';


@Component({
    selector: 'providers-list',
    templateUrl: './providers-list.component.html'
})
export class ProvidersListComponent implements OnInit {

    providers! : ProviderResDto[];

    constructor(private provider : ProviderService) { }

    ngOnInit(): void {
        this.getAllProviders();
    }

    getAllProviders() {
        this.provider.getAllProviders().subscribe(result => {
            this.providers = result
        });
    }

}