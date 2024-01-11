import { Component, Input, EventEmitter, Output, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTileAdderComponent } from '../modal-tile-adder/modal-tile-adder.component';
import { SupabaseService } from '../supabase.service'

export interface Tile {
  color_code: string;
  style_code: string;
  description: string;
  merch_type: string; // Adjust the type if necessary
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit{

  constructor(private dialog: MatDialog, private readonly supabase: SupabaseService) {}
  ngOnInit() {
      this.supabase.getItemsByUser().then(items => {
        if (items !== null) {
        // Map the items to the desired structure
        this.tiles = items.map(item => ({
          title: item.style_code, // Assuming style_code is used as title
          description: item.description, // Assuming description is used as content
          colorCode: item.color_code,
          itemType: item.merch_type,
          itemId: item.id
        }));
      }
    });
  }

  openModal(itemType: string): void {
    const dialogRef = this.dialog.open(ModalTileAdderComponent, {
      data: { itemType }, // Pass data to the modal if needed
    });
    dialogRef.afterClosed().subscribe(result => {
    // Handle modal close event if needed
      console.log('The modal was closed with result:', result);
      const newTile = {
        title: itemType,
        content: 'This is some content for the new tile.',
      };

    });
  }

  tiles: { title: string; description: string; colorCode: string; itemType: string; itemId: number}[] = [];

  addTile(itemType: string): void {
    this.openModal(itemType);
  }

}

