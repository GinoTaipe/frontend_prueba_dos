import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.html',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaForm implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly personaService = inject(PersonaService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  readonly isEdit = !!this.route.snapshot.params['docIdentidad']
  private readonly editDocIdentidad = this.route.snapshot.params['docIdentidad'] ?? null

  readonly form = this.fb.nonNullable.group({
    docIdentidad: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
    email: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
    if (this.editDocIdentidad) {
      this.personaService.getByDocIdentidad(this.editDocIdentidad).subscribe({
        next: (p) => this.form.patchValue(p),
        error: () => this.router.navigate(['/personas'])
      })
    }
  }

  submit(): void {
    if (this.form.invalid) return

    const data = this.form.getRawValue()
    const request = this.editDocIdentidad
      ? this.personaService.update(this.editDocIdentidad, data)
      : this.personaService.create(data)

    request.subscribe({
      next: () => this.router.navigate(['/personas']),
      error: (err) => {
        console.error('Error saving persona', err)
        alert('Error al guardar persona')
      }
    })
  }
}
