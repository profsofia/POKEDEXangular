import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {
  pokemon : any = '';
  pokemonType = [];
  pokemonImg = '';
  pokeAbility : any = [];
  moves ='';
  

  //luego crearemos mas cosas para rellenar la tarjeta


//inyectamos el servicio y route para obtener la url
  constructor(private pokemonService : PokemonService, private activateRouter : ActivatedRoute) {
    //cuando se crea el componente..
    this.activateRouter.params.subscribe(
      (params)=>{
      this.getPokemon(params['id']);
    })
   }

  ngOnInit(): void {
  }
  getPokemon(id : any) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        /*console.log(res);*/
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.other.dream_world.front_default;
        this.pokemonType = res.types[0].type.name;
        this.pokeAbility[0] = this.pokemon.abilities[0].ability.name;
        this.pokeAbility[1] = this.pokemon.abilities[1].ability.name;
        this.moves = this.pokemon.moves[0].move.name;
        
      },
      err => {console.log(err);}


    )
  }

}
