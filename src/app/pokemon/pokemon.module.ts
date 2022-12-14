import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { BorderCardDirective } from "./border-card.directive";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { SearchPokemonComponent } from "./search-pokemon/search-pokemon.component";
import { LoadingComponent } from "./loading/loading.component";

import { AuthGuard } from "../auth.guard";

const pokemonRoutes: Routes = [
  {
    path: "edit/pokemon/:id",
    component: EditPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/add",
    component: AddPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemons",
    component: PokemonListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/:id",
    component: PokemonDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonTypeColorPipe,
    BorderCardDirective,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
})
export class PokemonModule {}
