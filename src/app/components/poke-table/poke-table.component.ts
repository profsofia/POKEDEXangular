import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  displayedColumns : string[] = ['position', 'image', 'name']; //
  data : any[] = []; //
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(){
    let pokemonData;
    for(let i = 0; i <=150; i++){
      this.pokeService.getPokemons(i).subscribe(
        res =>{
          pokemonData = {
            position : i,
            image: res.sprites.front_default,
            name: res.name
          };
          //almacenamos los datos de la api
          this.data.push(pokemonData);
          this.datasource = new MatTableDataSource<any>(this.data);
          //paginator
          this.datasource.paginator = this.paginator;
          console.log(res);
        },
        err => {console.log(err);}
      )
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  getRow(row: any){
    console.log(row);
  }
}
