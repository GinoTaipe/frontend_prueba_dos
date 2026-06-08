import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PersonaService } from '../../services/persona.service'
import { Persona } from '../../models/persona'

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaList implements OnInit {
  private readonly personaService = inject(PersonaService)
  readonly personas = signal<Persona[]>([])
  readonly loading = signal(true)
  readonly error = signal<string | null>(null)

  ngOnInit(): void {
    this.loadPersonas()
  }

  loadPersonas(): void {
    this.loading.set(true)
    this.error.set(null)
    this.personaService.getAll().subscribe({
      next: (data) => {
        this.personas.set(data)
        this.loading.set(false)
      },
      error: (err) => {
        console.error('Error loading personas', err)
        this.error.set('Error al cargar personas')
        this.loading.set(false)
      }
    })
  }
}
