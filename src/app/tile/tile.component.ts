import { Component, Input } from '@angular/core';
import { SupabaseService } from '../supabase.service'


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
})
export class TileComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() colorCode: string = '';
  @Input() itemType: string = '';
  @Input() itemId: any = 0;

  constructor(private readonly supabase: SupabaseService) {}

  // Define a mapping between itemType values and icon paths
  iconMapping: { [key: string]: string } = {
    shirt: '../../assets/img/fashion-02.png',
    bottoms: '../../assets/img/fashion-20.png',
    accessory: '../../assets/img/fashion-18.png',
    denim: '../../assets/img/fashion-16.png'
  };

   async replenItem(itemId: any){
    console.log(itemId);
    try {
        console.log(itemId);
        const { error } = await this.supabase.replenItem(itemId)
        if (error) throw error
        } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
    } finally {
    }

   }
}

