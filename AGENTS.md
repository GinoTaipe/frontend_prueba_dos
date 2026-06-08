# Frontend conventions

## Angular 21 specifics

- Standalone components only (no NgModules). Do NOT set `standalone: true` — it's the default.
- Use `input()` / `output()` functions, not `@Input()` / `@Output()` decorators.
- Use `inject()` function, not constructor injection.
- Use `@if` / `@for` / `@switch` native control flow, not `*ngIf` / `*ngFor`.
- Use `class` / `style` bindings, not `ngClass` / `ngStyle`.
- Use `computed()` for derived state. Do NOT use `mutate` on signals; use `update` or `set`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on components.
- Use `styleUrl` (singular), not `styleUrls` (plural).
- Reactive forms over template-driven.
- `NgOptimizedImage` for static images (not for inline base64).
- `@HostBinding` / `@HostListener` forbidden; use the `host` object in `@Component` instead.
- Services: `providedIn: 'root'`, single-responsibility.
- Use `provideBrowserGlobalErrorListeners()` in app config (Angular 21+).

## Project structure

```
src/app/
  components/   — each: .html + .ts only
  services/     — frontend logic + backend communication
  models/       — data interfaces (request/response shapes)
```

## Visual toolkit

- Bootstrap via CDN (not npm).

## Testing & quality

- Unit tests: Vitest (`ng test`). Test files end with `.spec.ts`.
- Must pass AXE checks and WCAG AA (focus management, color contrast, ARIA).
