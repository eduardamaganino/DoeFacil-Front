import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, OnDestroy {

  itensCollection: Item[] = [];
  currentItem: Item = {};
  currentIndex = -1;
  debug = true;
  category: string;
  private routeSubscription: Subscription;

  constructor(protected itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap
      .pipe(
        switchMap(params => {
          this.category = params.get('nameCategory');
          if(this.category == "calçados"){
            this.category = "calcados";
          } if(this.category == "decoração"){
            this.category = "decoracao";
          }if(this.category == "acessórios"){
            this.category = "acessorios";
          }
          return this.itemService.getAll();
        })
      )
      .subscribe(
        itens => {
          this.itensCollection = itens.filter(item => item.categoria === this.category);
          if (this.debug) console.log(this.itensCollection);
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  pedirDoacao(): void {
   
  }


  onSearchResults() {

   }
}
