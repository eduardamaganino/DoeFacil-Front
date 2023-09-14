import { Component } from '@angular/core';


@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent {

  
  categories = ['moda', 'calcados','joias', 'jardinagem', 'decoracao', 'brinquedos', 'livros', 'eletrodomesticos', 'moveis', 'outros'];
  radioValue: number = -1;


}
