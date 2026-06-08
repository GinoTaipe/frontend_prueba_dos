import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Persona, PersonaCreate, PersonaUpdate } from '../models/persona'

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = (window as any).__env__?.backendApiUrl ?? 'http://localhost:8000'
  private readonly apiUrl = `${this.baseUrl}/api/personas`

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl)
  }

  getByDocIdentidad(docIdentidad: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${encodeURIComponent(docIdentidad)}`)
  }

  create(data: PersonaCreate): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, data)
  }

  update(docIdentidad: string, data: PersonaUpdate): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${encodeURIComponent(docIdentidad)}`, data)
  }

  delete(docIdentidad: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(docIdentidad)}`)
  }
}
