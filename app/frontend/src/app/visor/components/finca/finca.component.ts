import { Component, Input } from '@angular/core';
import { PrimengModule } from '../../../primeng/primeng.module';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finca',
  standalone: true,
  imports: [CommonModule, PrimengModule, ReactiveFormsModule, RouterModule],
  templateUrl: './finca.component.html',
  styleUrl: './finca.component.css',
})
export class FincaComponent {
  visible: boolean = true;

  id: number | undefined = undefined;

  fincaForm: FormGroup = this.fb.group({
    lat: [{ value: undefined, disabled: true }, [Validators.required]],
    lng: [{ value: undefined, disabled: true }, [Validators.required]],
    tamanio: [{ value: undefined, disabled: false }, [Validators.required]],
    tipo_cultivo: [
      { value: undefined, disabled: false },
      [Validators.required],
    ],
  });

  actividadForm: any = this.fb.array([]);

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const { lat, lng } = this.activatedRoute.snapshot.params;

    this.fincaForm.patchValue({ lat, lng });
  }

  isValid() {
    return this.fincaForm.valid && this.actividadForm.valid;
  }

  addActivity() {
    const group = this.fb.group({
      fecha: [{ value: new Date(), disabled: false }, [Validators.required]],
      tipo_actividad: [
        { value: undefined, disabled: false },
        [Validators.required],
      ],
      insumos: [{ value: undefined, disabled: false }, [Validators.required]],
      duracion: [{ value: undefined, disabled: false }, [Validators.required]],
    });

    this.actividadForm.push(group);
  }

  save() {
    const fincaData = this.fincaForm.getRawValue();
    const actividadesData = this.actividadForm.getRawValue();

    console.log(fincaData, actividadesData);
  }

  reset() {
    this.fincaForm.reset();

    this.actividadForm.clear();
    this.actividadForm.reset();
  }

  close() {
    this.router.navigate(['/']);
  }
}
