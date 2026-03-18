import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../core/services/auth';

interface OnboardingStep {
  icon:        string;
  title:       string;
  description: string;
  action?:     string;
  actionRoute?: string;
  color:       string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatStepperModule],
  templateUrl: './onboarding.html',
  styleUrl:    './onboarding.scss'
})
export class OnboardingComponent implements OnInit {
  currentStep = 0;
  user = signal<any>(null);

  steps: OnboardingStep[] = [
    {
      icon: 'waving_hand',
      title:       '¡Bienvenido a Alpardimedia WP!',
      description: 'La plataforma más sencilla para crear y gestionar sitios WordPress de forma profesional. En menos de 5 minutos tendrás tu primer sitio listo.',
      color:       '#1E40AF'
    },
    {
      icon: 'create_new_folder',
      title:       'Crea tu primer proyecto',
      description: 'Un proyecto es un contenedor para tu sitio WordPress. Dale un nombre descriptivo y configura la base de datos. Nosotros hacemos el resto.',
      action:      'Crear proyecto',
      actionRoute: '/projects/install',
      color:       '#059669'
    },
    {
      icon: 'public',
      title:       'WordPress instalado automáticamente',
      description: 'Nuestro motor descarga, configura e instala WordPress en segundos. wp-config.php generado, base de datos creada, usuario admin listo.',
      color:       '#7C3AED'
    },
    {
      icon: 'tune',
      title:       'Gestiona desde el panel',
      description: 'Activa plugins, cambia temas, crea páginas y usuarios directamente desde Alpardimedia. Sin tocar el servidor, sin configuraciones manuales.',
      color:       '#D97706'
    },
    {
      icon: 'rocket_launch',
      title:       '¡Todo listo para empezar!',
      description: 'Has completado el tour. Crea tu primer proyecto WordPress ahora y descubre lo fácil que es gestionar tus sitios web.',
      action:      'Crear mi primer proyecto',
      actionRoute: '/projects/install',
      color:       '#0F172A'
    }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user.set(this.auth.currentUser());
    const seen = localStorage.getItem('onboarding_done');
    if (seen) this.router.navigate(['/dashboard']);
  }

  next() {
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
  }

  prev() {
    if (this.currentStep > 0) this.currentStep--;
  }

  skip() {
    localStorage.setItem('onboarding_done', '1');
    this.router.navigate(['/dashboard']);
  }

  goTo(route: string) {
    localStorage.setItem('onboarding_done', '1');
    this.router.navigate([route]);
  }

  get current(): OnboardingStep { return this.steps[this.currentStep]; }
  get isLast(): boolean { return this.currentStep === this.steps.length - 1; }
  get isFirst(): boolean { return this.currentStep === 0; }
}
