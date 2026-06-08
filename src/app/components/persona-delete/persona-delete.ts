import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { PersonaService } from '../../services/persona.service'
import { Persona } from '../../models/persona'

@Component({
  selector: 'app-persona-delete',
  templateUrl: './persona-delete.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaDelete implements OnInit {
  private readonly personaService = inject(PersonaService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  readonly persona = signal<Persona | null>(null)
  readonly loading = signal(true)
  readonly deleting = signal(false)
  readonly error = signal<string | null>(null)
  private docIdentidad = ''

  ngOnInit(): void {
    this.docIdentidad = this.route.snapshot.params['docIdentidad']
    this.personaService.getByDocIdentidad(this.docIdentidad).subscribe({
      next: (p) => {
        this.persona.set(p)
        this.loading.set(false)
      },
      error: () => {
        this.error.set('Persona no encontrada')
        this.loading.set(false)
      }
    })
  }

  confirmDelete(): void {
    this.deleting.set(true)
    this.personaService.delete(this.docIdentidad).subscribe({
      next: () => this.router.navigate(['/personas']),
      error: (err) => {
        console.error('Error deleting persona', err)
        this.deleting.set(false)
        this.error.set('Error al eliminar persona')
      }
    })
  }
}
