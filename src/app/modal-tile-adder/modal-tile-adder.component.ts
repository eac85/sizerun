import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../supabase.service'

@Component({
  selector: 'app-modal-tile-adder',
  templateUrl: './modal-tile-adder.component.html',
  styleUrls: ['./modal-tile-adder.component.css'],
})
export class ModalTileAdderComponent {
  @Output() addInfo = new EventEmitter<{ title: string; content: string }>();

  itemType: string; // Property to hold the item type parameter
  itemName: string = ''; // Property to bind to the common input field
  itemForm: FormGroup;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalTileAdderComponent>, 
    private readonly supabase: SupabaseService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.itemType = data.itemType; // Assign the item type parameter

    this.itemForm = this.fb.group({
      description: ['', Validators.required],
      styleCode: ['', Validators.required],
      colorCode: ['', Validators.required],
      sizeXS: [0, Validators.required],
      sizeS: [0, Validators.required],
      sizeM: [0, Validators.required],
      sizeL: [0, Validators.required],
      sizeXL: [0, Validators.required],
    });
  }

  async submitForm() {
     try {
      const itemData = this.itemForm.value;
      itemData.itemType = this.itemType;
      console.log(itemData);
      const { error } = await this.supabase.addItem(itemData)
      if (error) throw error
      } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
    }

  }
}

