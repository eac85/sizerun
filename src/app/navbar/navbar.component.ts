import { Component, Input, OnInit } from '@angular/core'
import { AuthSession } from '@supabase/supabase-js'
import { Profile, SupabaseService } from '../supabase.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profile!: Profile
  loading = false
  showAccount = true

  @Input()
  session!: AuthSession

  constructor(private readonly supabase: SupabaseService
   ) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile()
  }

  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      const { data: profile, error, status } = await this.supabase.profile(user)

      if (error && status !== 406) {
        throw error
      }

      if (profile) {
        this.profile = profile
        console.log("at navbar");
        console.log(profile);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.supabase.signOut()
  }

  async updateProfile() {
    await this.supabase.signOut()
  }

}
