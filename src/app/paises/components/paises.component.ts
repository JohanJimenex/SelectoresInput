import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisesService } from '../services/paises.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  public regiones: string[] = [];
  public paises: Pais[] = [];
  public fronteras: string[] = [];

  public cargando: boolean = false;

  miForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: [{ value: '', disabled: true }, [Validators.required]],
    frontera: [{ value: '', disabled: true }, [Validators.required]],
  })

  constructor(private fb: FormBuilder,
    private paisesSvc: PaisesService) { }


  ngOnInit(): void {

    this.regiones = this.paisesSvc.listaRegiones;

    // this.miForm.get('region')?.valueChanges
    //   .subscribe((region: string) => {

    //     this.paisesSvc.getPaisesPorRegion(region)
    //       .subscribe((resp: Pais[]) => {
    //         this.paises = resp;
    //       })
    //   })

    //Otra forma con el pispe SwitchMap
    this.miForm.get('region')?.valueChanges
      .pipe(
        // el tap es para ejecutar lo que quieras antes de la peticion
        tap((_) => {
          this.cargando = true;

          this.miForm.get('pais')?.reset('')
          this.miForm.get('pais')?.enable()
        }),
        //Se debe retornar la otra peticion
        switchMap(region => this.paisesSvc.getPaisesPorRegion(region))
      ).subscribe((paises: Pais[]) => {

        this.paises = paises
        this.cargando = false;
      })


    this.miForm.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.cargando = true;
          this.miForm.get('frontera')?.reset('')
          this.miForm.get('frontera')?.enable()
        }),
        switchMap(codigoPais => this.paisesSvc.getPaisPorCodigo(codigoPais))
      ).subscribe((resp: any) => {

        this.fronteras = resp ? resp.borders : []
        this.cargando = false;

      })
  }

  public someter(): void {
    console.log(this.miForm.value);
  }



}
