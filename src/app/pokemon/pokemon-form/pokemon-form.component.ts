import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  pokemonTypeList: string[] | undefined;
  isAddForm!: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonTypeList = this.pokemonService.getPokemonTypeList();
    //detect if the url contains add
    this.isAddForm = this.router.url.includes("add");
  }

  /**
   * check type of pokemon
   * @param type
   * @returns
   */
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  /**
   * check if frame checked
   * @param $event
   * @param type
   */
  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon?.types.push(type);
    } else {
      //remove type
      const index = this.pokemon.types.indexOf(type);
      this.pokemon?.types.splice(index, 1);
    }
  }

  /**
   * check if the user can check the frame
   * @param type
   * @returns
   */
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    } else if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) =>
          this.router.navigate(["/pokemon", pokemon.id])
        );
    } else {
      this.pokemonService
        .updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(["/pokemon", this.pokemon.id]));
    }
  }
}
