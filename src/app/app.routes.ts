import { Routes } from '@angular/router'
import { PersonaList } from './components/persona-list/persona-list'
import { PersonaForm } from './components/persona-form/persona-form'
import { PersonaDelete } from './components/persona-delete/persona-delete'

export const routes: Routes = [
  { path: '', redirectTo: '/personas', pathMatch: 'full' },
  { path: 'personas', component: PersonaList },
  { path: 'personas/nueva', component: PersonaForm },
  { path: 'personas/:docIdentidad/editar', component: PersonaForm },
  { path: 'personas/:docIdentidad/eliminar', component: PersonaDelete }
]
