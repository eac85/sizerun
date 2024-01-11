import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
  PostgrestResponse
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
import { Observable, Observer} from 'rxjs';


export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  getItemsByUser(){
    let id = null;
    if(this.session !== null){
      if (this.session.user?.id !== null && this.session.user !== undefined) {
       //console.log(this.session.user.id);
       id = this.session.user.id;
      }
    }
    return this.supabase
      .from('item')
      .select('color_code, style_code, description, merch_type, create_user, id')
      .eq('create_user', id)
      .eq('replenned', false)
      .then(response => response.data);
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

   getUserProfile<T>(userId: string) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', userId)
      .single()
      .then(response => response.data as T);
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    console.log(this.session)
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  addItem(itemData: any) {
    console.log("adding!");
    let id = null;
    if(this.session !== null){
      if (this.session.user?.id !== null && this.session.user !== undefined) {
       console.log(this.session.user.id);
       id = this.session.user.id;
       console.log(this.getItemsByUser());
      }
    }

    const data = {
      description: itemData.description,
      color_code: itemData.colorCode,
      style_code: itemData.styleCode,
      merch_type: itemData.itemType,
      replenned: false,
      create_user: id
    }
    
    return this.supabase.from('item').insert(data)
  }

  replenItem(itemId: any){
    console.log("repleenned");
    const updates = { replenned: true };

    return this.supabase
      .from('item')
      .upsert([{ id: itemId, ...updates }])
      .eq('id', itemId)
      .single();

  }

}