import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileService } from '../../core/services/profile';
import { AuthService } from '../../core/services/auth';
import { UiService } from '../../core/services/ui';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatTabsModule, MatChipsModule, MatTooltipModule, MatDividerModule
  ],
  templateUrl: './profile.html',
  styleUrl:    './profile.scss'
})
export class ProfileComponent implements OnInit {
  profile: any   = null;
  stats: any     = null;
  activity: any[] = [];
  loading        = true;
  savingProfile  = false;
  savingPassword = false;
  hideCurrentPw  = true;
  hideNewPw      = true;

  profileForm: FormGroup;
  passwordForm: FormGroup;

  planLabels: any = { free: 'Free', basic: 'Basic', pro: 'Pro', enterprise: 'Enterprise' };
  planColors: any = { free: 'gray', basic: 'blue', pro: 'purple', enterprise: 'gold' };

  activityIcons: any = {
    profile_update: 'edit',
    password_change: 'lock',
    project_create: 'add_circle',
    project_delete: 'delete',
    wp_install: 'language',
    login: 'login',
    default: 'history'
  };

  constructor(
    private profileService: ProfileService,
    private auth: AuthService,
    private ui: UiService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword:     ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.loading = true;
    Promise.all([
      this.profileService.getProfile().toPromise(),
      this.profileService.getStats().toPromise(),
      this.profileService.getActivity().toPromise()
    ]).then(([profile, stats, activity]) => {
      this.profile  = profile;
      this.stats    = stats;
      this.activity = activity || [];
      this.profileForm.patchValue({ name: profile.name, email: profile.email });
      this.loading  = false;
    }).catch(() => { this.loading = false; });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    this.savingProfile = true;
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.profile = { ...this.profile, ...this.profileForm.value };
        this.ui.success('Perfil actualizado');
        this.savingProfile = false;
      },
      error: (err) => {
        this.ui.error(err.error?.error || 'Error al actualizar');
        this.savingProfile = false;
      }
    });
  }

  changePassword() {
    if (this.passwordForm.invalid) return;
    const { newPassword, confirmPassword, currentPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      this.ui.error('Las contraseñas no coinciden');
      return;
    }
    this.savingPassword = true;
    this.profileService.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.ui.success('Contraseña actualizada');
        this.passwordForm.reset();
        this.savingPassword = false;
      },
      error: (err) => {
        this.ui.error(err.error?.error || 'Error al cambiar contraseña');
        this.savingPassword = false;
      }
    });
  }

  getActivityIcon(action: string): string {
    return this.activityIcons[action] || this.activityIcons.default;
  }

  logout() { this.auth.logout(); }
}
